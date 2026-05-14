import OpenAI from "openai";

function getOpenAIClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
}

export async function generateText(prompt: string, model = "gpt-4o-mini") {
  const client = getOpenAIClient();
  const completion = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant integrated into Nocodly AI platform. Provide clear, concise, and helpful responses.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });

  return {
    text: completion.choices[0]?.message?.content ?? "",
    tokens: completion.usage?.total_tokens ?? 0,
    model: completion.model,
  };
}
