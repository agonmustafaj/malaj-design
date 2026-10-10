"use client";

import { RevealText } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  id?: string;
  eyebrow?: string;
  lines: string[];
  italicLine?: number;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionTitle({ id, eyebrow, lines, italicLine, className, as: Heading = "h2" }: SectionTitleProps) {
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Heading id={id} className="display uppercase">
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
      </Heading>
    </div>
  );
}
