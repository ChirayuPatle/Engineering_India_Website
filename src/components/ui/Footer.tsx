"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  console.log("PATHNAME", pathName);
  
  if (pathName?.startsWith("/dashboard")) return null;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {["About", "Work", "Services", "Contact", "Privacy", "Terms"].map(
            (item) => (
              <div key={item} className="pb-6">
                <Link
                  href="https://www.flowersandsaints.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                >
                  {item}
                </Link>
              </div>
            ),
          )}
        </nav>
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          Designed & Developed with ❤️ by{" "}
          <Link
            target="_blank"
            className="underline hover:text-blue-600"
            href={"https://github.com/Priyanshudotdev"}
          >
            Priyanshu Kayarkar
          </Link>
          ,{" "}
          <Link
            target="_blank"
            className="underline hover:text-blue-600"
            href={"https://github.com/ChirayuPatle"}
          >
            Chirayu Patle
          </Link>{" "}
          &{" "}
          <Link
            target="_blank"
            className="underline hover:text-blue-600"
            href={"https://github.com/Muchkundraje"}
          >
            Muchkundraje Thote
          </Link>
        </p>
      </div>
    </footer>
  );
}
