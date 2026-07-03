"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Trophy,
  Users,
  ArrowRight,
  Rocket,
  Award,
  Code2,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HackathonInfoCard() {
  return (
    <Card className="overflow-hidden border-2 border-black bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl">
      {/* Animated gradient header */}
      <div className="relative h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-50" />
      </div>

      <CardHeader className="space-y-4 pb-4">
        {/* Top Badge Row */}
        <div className="flex items-start justify-between gap-2">
          <Badge className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
            <Rocket className="mr-1 h-3 w-3" />
            FLAGSHIP EVENT
          </Badge>
          <Badge className="border border-orange-500 bg-orange-500/10 px-2 py-1 text-xs font-semibold text-orange-400">
            <Clock className="mr-1 h-3 w-3" />
            24 Hours
          </Badge>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-3xl font-black text-white md:text-4xl">
            <Code2 className="h-8 w-8 text-purple-400 md:h-10 md:w-10" />
            HACKATHON 2025
          </CardTitle>
          <p className="text-sm font-medium text-gray-300">
            Unleash Innovation. Build the Future.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pb-6">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden rounded-lg border-2 border-gray-700 shadow-lg">
          <Image
            src="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpfeU5o0XrTM2A4iGtHSU9JzXjlhanE7L0yQkV"
            alt="Hackathon 2025"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Date */}
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3 backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-1.5 text-gray-400">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Event Date</span>
            </div>
            <p className="text-sm font-bold text-white">Nov 01, 2025</p>
          </div>

          {/* Location */}
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3 backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-1.5 text-gray-400">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Venue</span>
            </div>
            <p className="text-sm font-bold text-white">YCCE, Nagpur</p>
          </div>

          {/* Entry Fee */}
          <div className="rounded-lg border border-emerald-700 bg-emerald-900/30 p-3 backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-1.5 text-emerald-400">
              <DollarSign className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Entry Fee</span>
            </div>
            <p className="text-sm font-bold text-emerald-300">₹300/team</p>
          </div>

          {/* Prize Pool */}
          <div className="rounded-lg border border-yellow-700 bg-yellow-900/30 p-3 backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-1.5 text-yellow-400">
              <Trophy className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Prize Pool</span>
            </div>
            <p className="text-sm font-bold text-yellow-300">₹13,000</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Zap className="h-4 w-4 text-yellow-400" />
            Event Highlights
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 rounded-lg bg-gray-900/50 p-3">
              <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" />
              <div>
                <p className="text-xs font-semibold text-white">
                  Certificates for All
                </p>
                <p className="text-xs text-gray-400">
                  Every participant receives a certificate
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-gray-900/50 p-3">
              <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
              <div>
                <p className="text-xs font-semibold text-white">Team Event</p>
                <p className="text-xs text-gray-400">2-4 members per team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Deadline */}
        <div className="rounded-lg border-2 border-orange-600 bg-gradient-to-r from-orange-900/40 to-red-900/40 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Registration Ends
              </p>
              <p className="text-lg font-black text-white">Oct 29, 2025</p>
            </div>
            <Clock className="h-8 w-8 text-orange-400 opacity-50" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid gap-3">
          <Link href="/events/hackathon" className="w-full">
            <Button
              size="lg"
              className="w-full border-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              <Rocket className="mr-2 h-5 w-5" />
              View Full Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/events/hackathon/register" className="w-full">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-2 border-white bg-transparent font-bold text-white transition-all hover:bg-white hover:text-black"
            >
              Register Now
            </Button>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-center">
          <p className="text-xs text-gray-400">
            🚀 Join <span className="font-bold text-white">80+</span> passionate
            engineers in this epic coding marathon
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
