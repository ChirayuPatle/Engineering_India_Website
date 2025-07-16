"use client";
import { MessageCircle } from "lucide-react";

function Membership() {
  const whatsappContacts = [
    { number: "+919373690752", label: "Primary Contact" },
    { number: "+919146655108", label: "Secondary Contact" },
  ];

  const handleWhatsAppClick = (raw: string) => {
    const clean = raw.replace(/\s+/g, "");
    window.open(`https://wa.me/${clean}`, "_blank");
  };

  return (
    <main className="flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-2xl space-y-8 rounded-2xl border-[1px] border-zinc-300 bg-white p-6 sm:p-10">
        {/* Header */}
        <header>
          <h1 className="border-b pb-4 text-3xl font-bold text-slate-800">
            Membership Status
          </h1>
        </header>

        {/* Notice */}
        <aside className="rounded-r-xl border-l-4 border-amber-500 bg-amber-50 p-5">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Important Notice
          </h2>
          <p className="text-base text-slate-700">
            Membership Applications are currently closed.
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Interviews for existing applicants will commence soon. Stay tuned
            for further updates!
          </p>
        </aside>
      </section>
    </main>
  );
}

export default Membership;
