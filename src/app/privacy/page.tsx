import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Engineering India YCCE",
  description: "Privacy Policy for Engineering India YCCE.",
};

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0F1B40] px-4 py-24 text-white">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60 backdrop-blur-xl">
          Legal
        </div>

        <h1 className="font-fraunces mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/60">
          We&apos;re working on our Privacy Policy. This page will be available
          soon. Thank you for your patience.
        </p>

        <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl">
          <h2 className="font-fraunces mb-3 text-xl font-semibold text-white">
            What we collect
          </h2>
          <p className="text-sm leading-relaxed text-white/60">
            Engineering India YCCE collects basic profile information (name,
            email) when you sign in via Google OAuth, used solely for event
            registration and member management. We do not sell or share your
            data with third parties.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
