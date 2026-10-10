import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page-x flex min-h-screen flex-col justify-end pb-16 pt-32 outline-none">
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">404</p>
      <h1 className="mt-4 max-w-[12ch] text-[clamp(3rem,8vw,6.4rem)] leading-[0.88] tracking-[-0.045em]">
        This page is not in the series.
      </h1>
      <Link
        href="/#work"
        className="mt-10 inline-flex min-h-12 w-fit items-center border border-ink/20 px-6 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-ink hover:text-bg"
      >
        Back to the work
      </Link>
    </main>
  );
}
