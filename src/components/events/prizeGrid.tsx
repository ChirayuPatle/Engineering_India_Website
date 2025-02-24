import { Card } from "@/components/ui/card";
import Image from "next/image";

const prizes = [
  {
    name: "ETHDenver",
    amount: "$80,000",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20212307-1ZEYRDncPvOFnrpInLBphKVDiXffn7.png",
  },
  {
    name: "Polkadot",
    amount: "$10,000",
    logo: "/placeholder.svg",
  },
  {
    name: "EigenLayer",
    amount: "$50,000",
    logo: "/placeholder.svg",
  },
  {
    name: "Story",
    amount: "$20,000",
    logo: "/placeholder.svg",
  },
  {
    name: "zircuit",
    amount: "$18,000",
    logo: "/placeholder.svg",
  },
  {
    name: "okto",
    amount: "$25,000",
    logo: "/placeholder.svg",
  },
];

export function PrizeGrid() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">$1,043,333</h2>
        <p className="text-muted-foreground">Available in Prizes</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prizes.map((prize) => (
          <Card key={prize.name} className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  src={prize.logo || "/placeholder.svg"}
                  alt={`${prize.name} logo`}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold">{prize.name}</h3>
                <p className="text-muted-foreground">{prize.amount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
