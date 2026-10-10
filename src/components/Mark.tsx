import { cn } from "@/lib/cn";

type MarkProps = {
  className?: string;
};

export function Mark({ className }: MarkProps) {
  return (
    <svg
      viewBox="530 0 670 748"
      aria-hidden="true"
      className={cn("fill-current", className)}
    >
      <polygon points="686.53 385.3 686.53 .89 895.05 139.15 1105.77 0 1104.84 106.75 945.74 217.55 945.74 513.1 756.47 639.99 676.37 584.87 844.58 466.89 845.07 223.71 784.28 183.13 784.64 437.25 622.69 547.12 536.93 486.8 686.53 385.3" />
      <polyline points="897.03 734.48 1113.84 590.34 1113.86 301.12 1188.65 253.09 1190.3 134.97 1017.06 248.79 1016.12 539.74 810.86 673.92 811.23 674.17" />
    </svg>
  );
}
