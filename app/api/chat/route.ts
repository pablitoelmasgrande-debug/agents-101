import { createAgentUIStreamResponse } from "ai";
import { adScriptAgent } from "@/lib/agents/ad-script-agent";

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent: adScriptAgent,
    uiMessages: messages,
    abortSignal: request.signal,
  });
}
