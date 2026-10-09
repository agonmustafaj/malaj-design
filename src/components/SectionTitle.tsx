"use client";

import { RevealText } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  id?: string;
  eyebrow?: string;
  lines: string[];
  italicLine?: number;
  className?: string;
};

export function SectionTitle({ id, eyebrow, lines, italicLine, className }: SectionTitleProps) {
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 id={id} className="display uppercase">
        {lines.map((line, index) => (
          <RevealText key={line} as="span" className="block" delay={index * 0.08}>
            <span
              className={cn(
                "block",
                italicLine === index && "font-serif italic font-normal normal-case",
              )}
            >
              {line}
            </span>
          </RevealText>
        ))}
      </h2>
    </div>
  );
}
