"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function HackathonDebugPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [resetResult, setResetResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hackathon/debug-reset");
      const data = await res.json();
      setDebugData(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching debug data");
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    if (!confirm("Are you sure you want to clear Round 1 submission data?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/hackathon/debug-reset", { method: "POST" });
      const data = await res.json();
      setResetResult(data);
      alert("Data cleared! Please refresh your submission page.");
    } catch (error) {
      console.error(error);
      alert("Error resetting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Hackathon Round 1 - Debug & Reset</h1>

      <Card>
        <CardHeader>
          <CardTitle>Current Database State</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={checkData} disabled={loading}>
            Check Current Data
          </Button>

          {debugData && (
            <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm">
              {JSON.stringify(debugData, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reset Submission Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will clear round1PptUrl, round1SubmittedAt, and set
            round1Status to "not_submitted"
          </p>
          <Button onClick={resetData} disabled={loading} variant="destructive">
            Clear Round 1 Data
          </Button>

          {resetResult && (
            <div className="rounded bg-green-100 p-4 text-green-800">
              {resetResult.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
