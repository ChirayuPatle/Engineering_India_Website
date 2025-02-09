"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RegistrationData } from "./types";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Other",
];

export function DetailsStep() {
  // Destructure setValue along with register and errors.
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<RegistrationData>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label>Country</Label>
        <Select onValueChange={(value: string) => setValue("country", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country.toLowerCase()}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Payment QR Code</Label>
        <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Payment QR Code"
            width={200}
            height={200}
            className="mb-4"
          />
          <p className="text-sm text-muted-foreground text-center">
            Scan this QR code to make the payment
          </p>
        </div>
      </div>
    </motion.div>
  );
}
