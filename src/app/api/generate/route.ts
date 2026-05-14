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

    // Save to DB if Supabase is configured
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServerClient();
        await supabase.from("generations").insert({
          prompt,
          output: result.text,
          model: result.model,
          tokens_used: result.tokens,
        });
      } catch {
        // Non-fatal — DB save failure shouldn't break generation
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
