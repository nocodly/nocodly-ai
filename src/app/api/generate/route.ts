import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/openai";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.trim().length < 3) {
      return NextResponse.json({ error: "Prompt is too short" }, { status: 400 });
    }

    if (prompt.length > 4000) {
      return NextResponse.json({ error: "Prompt is too long (max 4000 chars)" }, { status: 400 });
    }

    const result = await generateText(prompt);

    // Save to DB with user association
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServerClient();

        // Get user from Authorization header
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");
        let userId: string | null = null;

        if (token) {
          const { data: { user } } = await supabase.auth.getUser(token);
          userId = user?.id ?? null;
        }

        // Save generation
        await (supabase as any).from("generations").insert({
          ...(userId ? { user_id: userId } : {}),
          prompt,
          output: result.text,
          model: result.model,
          tokens_used: result.tokens,
        });

        // Update usage_tracking for this user
        if (userId) {
          const { data: existing } = await (supabase as any)
            .from("usage_tracking")
            .select("total_generations, tokens_used")
            .eq("user_id", userId)
            .single() as { data: { total_generations: number; tokens_used: number } | null };

          if (existing) {
            await (supabase as any)
              .from("usage_tracking")
              .update({
                total_generations: existing.total_generations + 1,
                tokens_used: existing.tokens_used + result.tokens,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", userId);
          } else {
            await (supabase as any).from("usage_tracking").insert({
              user_id: userId,
              total_generations: 1,
              tokens_used: result.tokens,
            });
          }
        }
      } catch (dbErr) {
        console.error("[/api/generate] DB error:", dbErr);
      }
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[/api/generate]", err);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}
