import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/generateWithGemini";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { message: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    const generatedText = await generateWithGemini(prompt);

    if (!generatedText) {
      return NextResponse.json(
        { message: "No text was generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error("[GENERATE]", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Error" },
      { status: 500 }
    );
  }
}
