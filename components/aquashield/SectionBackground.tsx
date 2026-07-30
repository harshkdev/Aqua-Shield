"use client";

interface SectionBackgroundProps {
  isDark?: boolean;
}

/** Lightweight static gradient — no animated particles. Use WaveBackground only in hero. */
export default function SectionBackground({ isDark = true }: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark
            ? "bg-[#07162B] bg-[radial-gradient(circle_at_20%_25%,rgba(0,194,209,0.12)_0%,transparent_55%),radial-gradient(circle_at_80%_20%,rgba(0,194,209,0.1)_0%,transparent_55%),radial-gradient(circle_at_70%_70%,rgba(11,79,140,0.15)_0%,transparent_60%)]"
            : "bg-[#F2FAFD] bg-[radial-gradient(circle_at_15%_25%,rgba(186,242,252,0.85)_0%,transparent_55%),radial-gradient(circle_at_85%_15%,rgba(204,245,255,0.9)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(215,248,255,0.75)_0%,transparent_55%)]"
        }`}
      />
      <div
        className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: "rgba(0, 200, 255, 0.08)" }}
      />
    </div>
  );
}
