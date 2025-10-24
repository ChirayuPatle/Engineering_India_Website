"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadButton } from "@/lib/uploadthing";
import {
  AlertCircle,
  CheckCircle,
  Upload,
  FileText,
  Users,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmissionStatus {
  teamName: string;
  paymentStatus: string;
  hasSubmitted: boolean;
  pptUrl: string | null;
  submittedAt: string | null;
  round1Status: string;
  submissionPeriod: {
    start: string;
    end: string;
    isActive: boolean;
  };
}

export default function Round1SubmissionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  // Fetch submission status
  const {
    data: status,
    isLoading,
    error,
  } = useQuery<SubmissionStatus>({
    queryKey: ["hackathon-round1-status"],
    queryFn: async (): Promise<SubmissionStatus> => {
      const res = await fetch("/api/hackathon/submit-round1");
      const data: SubmissionStatus | { error: string } = await res.json();
      if (!res.ok) {
        throw new Error(
          "error" in data ? data.error : "Failed to fetch status",
        );
      }
      return data as SubmissionStatus;
    },
  });

  // Submit PPT mutation
  const submitMutation = useMutation({
    mutationFn: async (pptUrl: string): Promise<{ message: string }> => {
      const res = await fetch("/api/hackathon/submit-round1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pptUrl }),
      });
      const data: { message: string } | { error: string } = await res.json();
      if (!res.ok) {
        throw new Error("error" in data ? data.error : "Failed to submit PPT");
      }
      return data as { message: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hackathon-round1-status"] });
      queryClient.invalidateQueries({ queryKey: ["hackathonRegistration"] });
      setUploadedFileUrl(null);
    },
  });

  const handleSubmit = () => {
    if (uploadedFileUrl) {
      submitMutation.mutate(uploadedFileUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 p-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "You are not authorized to access this page. Only team leaders can submit Round 1 PPT."}
          </AlertDescription>
        </Alert>
        <Button
          onClick={() => router.push("/dashboard")}
          className="mt-4"
          variant="outline"
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // status is guaranteed when not loading; avoid unused local vars

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-gray-700" />
          <h1 className="text-3xl font-bold">Round 1 Submission</h1>
        </div>
        <p className="text-muted-foreground">
          Upload your team's presentation for Round 1 evaluation
        </p>
      </div>

      {/* Team Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Team Name:</span>
            <span>{status!.teamName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Status:</span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                status!.paymentStatus === "verified"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status!.paymentStatus.toUpperCase()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Not Verified Alert */}
      {status!.paymentStatus !== "verified" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Not Verified</AlertTitle>
          <AlertDescription>
            Your payment must be verified before you can submit Round 1 PPT.
            Please wait for admin verification.
          </AlertDescription>
        </Alert>
      )}

      {/* Already Submitted */}
      {status!.hasSubmitted ? (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Submission Completed
            </CardTitle>
            <CardDescription>
              Your team has successfully submitted the Round 1 PPT
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(status!.submittedAt!).toLocaleString("en-IN")}
              </p>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <a
                  href={status!.pptUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Submitted PPT
                </a>
              </div>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You can only submit once. If you need to make changes, please
                contact the organizers.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        /* Upload Form */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Presentation (PDF)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {/* Naming Convention Card */}
              <Alert className="border-slate-200 bg-white">
                <FileText className="h-4 w-4 text-slate-700" />
                <AlertTitle className="font-semibold text-slate-900">
                  File Naming Convention
                </AlertTitle>
                <AlertDescription className="mt-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                      <p className="mb-2 text-sm font-medium text-slate-800">
                        For Specific Problem Statement
                      </p>
                      <div className="inline-flex items-center gap-2">
                        <code className="rounded bg-slate-900 px-3 py-1 font-mono text-sm text-slate-100">
                          TeamName_ProblemStatementID.pdf
                        </code>
                      </div>
                      <p className="mt-2 text-xs text-slate-600">
                        Example:{" "}
                        <code className="rounded bg-white px-2 py-0.5 text-slate-800">
                          TechTitans_PR25-02.pdf
                        </code>
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                      <p className="mb-2 text-sm font-medium text-slate-800">
                        For Open Innovation
                      </p>
                      <div className="inline-flex items-center gap-2">
                        <code className="rounded bg-slate-900 px-3 py-1 font-mono text-sm text-slate-100">
                          TechTitans.pdf
                        </code>
                      </div>
                      <p className="mt-2 text-xs text-slate-600">
                        Example:{" "}
                        <code className="rounded bg-white px-2 py-0.5 text-slate-800">
                          Falcons.pdf
                        </code>
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Upload Instructions */}
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <Upload className="h-5 w-5 text-slate-700" />
                  <h4 className="font-semibold text-slate-900">Upload Steps</h4>
                </div>

                <ol className="list-inside list-decimal space-y-2 text-sm text-slate-700">
                  <li>
                    Rename your PDF according to the naming convention above.
                  </li>
                  <li>
                    Click the "Choose File" button below to select your PDF (max
                    16MB).
                  </li>
                  <li>
                    Wait for the upload to complete — you will see a
                    confirmation link when done.
                  </li>
                  <li>
                    Once uploaded, click "Submit Round 1 PPT" to finalize your
                    submission.
                  </li>
                </ol>

                <div className="mt-3 text-xs text-slate-600">
                  <p className="mb-1">
                    <strong>Allowed format:</strong> PDF only
                  </p>
                  <p>
                    <strong>Max size:</strong> 16MB
                  </p>
                </div>
              </div>

              {/* Upload Button Area */}
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full bg-blue-100 p-4">
                    <FileText className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-700">
                      Upload Your Presentation
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF files only • Maximum 16MB
                    </p>
                  </div>

                  {/* UploadThing Button */}
                  <div className="mt-2">
                    <UploadButton
                      endpoint="hackathonRound1Ppt"
                      appearance={{
                        button:
                          "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg ut-ready:bg-blue-600 ut-uploading:bg-blue-400 ut-uploading:cursor-not-allowed",
                        container: "flex flex-col items-center gap-2",
                        allowedContent: "text-xs text-gray-500",
                      }}
                      onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                          setUploadedFileUrl(res[0].url);
                          alert("✅ File uploaded successfully!");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`❌ Upload failed: ${error.message}`);
                      }}
                      disabled={
                        !status!.submissionPeriod.isActive ||
                        status!.paymentStatus !== "verified"
                      }
                    />
                  </div>
                </div>
              </div>

              {uploadedFileUrl && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-700">
                    File Uploaded
                  </AlertTitle>
                  <AlertDescription>
                    <a
                      href={uploadedFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View uploaded file
                    </a>
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleSubmit}
                disabled={
                  !uploadedFileUrl ||
                  submitMutation.isPending ||
                  !status!.submissionPeriod.isActive ||
                  status!.paymentStatus !== "verified"
                }
                className="w-full"
                size="lg"
              >
                {submitMutation.isPending
                  ? "Submitting..."
                  : "Submit Round 1 PPT"}
              </Button>

              {submitMutation.isError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {submitMutation.error instanceof Error
                      ? submitMutation.error.message
                      : "Failed to submit PPT"}
                  </AlertDescription>
                </Alert>
              )}

              {submitMutation.isSuccess && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-700">Success!</AlertTitle>
                  <AlertDescription>
                    Your Round 1 PPT has been submitted successfully!
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
