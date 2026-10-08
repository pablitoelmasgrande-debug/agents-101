import type { PresentScriptToolInvocation } from "@/lib/tools/present-script-tool";

export function ScriptCard({ invocation }: { invocation: PresentScriptToolInvocation }) {
  if (invocation.state !== "output-available") {
    return (
      <p className="text-sm text-foreground/60" aria-live="polite">
        Escribiendo el guion…
      </p>
    );
  }

  const script = invocation.output;

  return (
    <article className="space-y-4 rounded-lg border border-foreground/15 p-4">
      <header>
        <h2 className="text-lg font-semibold">{script.title}</h2>
        <p className="text-sm text-foreground/70">
          {script.platform} · {script.aspectRatio} · {script.durationSeconds}s
        </p>
        <p className="mt-1 text-sm text-foreground/70">Público: {script.audience}</p>
      </header>

      <section>
        <h3 className="text-sm font-semibold">Hook</h3>
        <p className="text-sm">{script.hook}</p>
      </section>

      <section className="overflow-x-auto">
        <h3 className="mb-2 text-sm font-semibold">Escenas</h3>
        <table className="w-full text-left text-sm">
          <thead className="text-foreground/70">
            <tr>
              <th scope="col" className="pr-3 pb-1 font-medium">Tiempo</th>
              <th scope="col" className="pr-3 pb-1 font-medium">Visual</th>
              <th scope="col" className="pr-3 pb-1 font-medium">Texto en pantalla</th>
              <th scope="col" className="pb-1 font-medium">Voz en off</th>
            </tr>
          </thead>
          <tbody>
            {script.scenes.map((scene, i) => (
              <tr key={i} className="border-t border-foreground/10 align-top">
                <td className="py-2 pr-3 whitespace-nowrap tabular-nums">{scene.timecode}</td>
                <td className="py-2 pr-3">{scene.visual}</td>
                <td className="py-2 pr-3">{scene.onScreenText || "—"}</td>
                <td className="py-2">{scene.voiceover || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3 className="text-sm font-semibold">CTA</h3>
        <p className="text-sm">{script.cta}</p>
      </section>

      <section>
        <h3 className="text-sm font-semibold">Música</h3>
        <p className="text-sm">{script.music}</p>
      </section>
    </article>
  );
}
