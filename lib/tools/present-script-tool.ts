import { tool, type UIToolInvocation } from "ai";
import { z } from "zod";

export const scriptSchema = z.object({
  title: z.string().describe("Short internal name for the ad"),
  platform: z
    .string()
    .describe("Target platform, e.g. Instagram Reels, TikTok, YouTube Shorts"),
  aspectRatio: z.enum(["9:16", "1:1", "4:5", "16:9"]),
  durationSeconds: z.number().int().min(5).max(120),
  audience: z.string().describe("Who the ad is for, in one sentence"),
  hook: z
    .string()
    .describe("What happens and is said in the first 3 seconds to stop the scroll"),
  scenes: z
    .array(
      z.object({
        timecode: z.string().describe('Time range, e.g. "0-3s"'),
        visual: z.string().describe("What the camera shows: shot, action, setting"),
        onScreenText: z.string().describe("Text overlay, empty if none"),
        voiceover: z.string().describe("Exact voice-over or dialogue line, empty if none"),
      }),
    )
    .min(2),
  cta: z.string().describe("Closing call to action, said and shown on screen"),
  music: z.string().describe("Music or sound direction"),
});

export type AdScript = z.infer<typeof scriptSchema>;

// The tool only echoes the script back: its job is to give the UI a typed,
// structured version of the script to render as a card.
export const presentScriptTool = tool({
  description:
    "Present the final ad video script to the user. Call it once per script, with every field filled in Spanish.",
  inputSchema: scriptSchema,
  execute: async (script) => script,
});

export type PresentScriptToolInvocation = UIToolInvocation<typeof presentScriptTool>;
