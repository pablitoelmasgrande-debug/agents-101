"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { ScriptCard } from "@/components/script-card";
import type { AdScriptAgentUIMessage } from "@/lib/agents/ad-script-agent";

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat<AdScriptAgentUIMessage>();
  const isBusy = status === "submitted" || status === "streaming";

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-4 sm:p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Guionista de anuncios
        </h1>
        <p className="mt-1 text-sm text-foreground/70">
          Cuéntame qué vendes y a quién, y te armo un guion de video listo para grabar.
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "self-end max-w-[85%]" : "w-full"}
          >
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <p
                      key={i}
                      className={
                        message.role === "user"
                          ? "rounded-lg bg-foreground/10 px-3 py-2 whitespace-pre-wrap"
                          : "whitespace-pre-wrap"
                      }
                    >
                      {part.text}
                    </p>
                  );
                case "tool-presentScript":
                  return <ScriptCard key={i} invocation={part} />;
                default:
                  return null;
              }
            })}
          </div>
        ))}
        {error && (
          <p role="alert" className="text-sm text-red-600">
            Algo falló: {error.message}
          </p>
        )}
      </div>

      <form
        className="sticky bottom-0 flex gap-2 bg-background py-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <label htmlFor="prompt" className="sr-only">
          Describe tu producto
        </label>
        <input
          id="prompt"
          className="flex-1 rounded-md border border-foreground/20 bg-transparent px-3 py-2"
          placeholder="Ej: cafetería de especialidad en Palermo, quiero más clientes por la mañana"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={isBusy}
          className="rounded-md bg-foreground px-4 py-2 text-background disabled:opacity-50"
        >
          {isBusy ? "Escribiendo…" : "Enviar"}
        </button>
      </form>
    </main>
  );
}
