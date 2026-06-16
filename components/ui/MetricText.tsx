const METRIC_PATTERN =
  /(\b\d[\d,]*(?:\.\d+)?%?\+?\b(?:\s*(?:person|people|health departments|inspector queries\/week|minutes|seconds|ms|stacks|CMR regulatory PDFs|high-confidence wet-lab candidates|protein-interaction records|call-completion reliability|emergency threshold|response types|latency|inference))?|\bunder\s+\d[\d,]*(?:\.\d+)?\s*(?:seconds|minutes|ms)\b|\bsub-\d[\d,]*(?:\.\d+)?\s*ms\b|\bzero hallucinated citations\b)/gi;

type MetricTextProps = {
  readonly text: string;
};

export function MetricText({ text }: MetricTextProps) {
  const parts = text.split(METRIC_PATTERN);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={`${part}-${index}`} className="font-black text-aero-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
