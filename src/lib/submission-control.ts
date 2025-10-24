// Shared submission period control
// This would ideally be stored in a database

let submissionPeriodOverride: {
  isActive: boolean;
  manuallyControlled: boolean;
  overrideStart: Date | null;
  overrideEnd: Date | null;
} = {
  isActive: false,
  manuallyControlled: false, // Start with automatic control
  overrideStart: null,
  overrideEnd: null,
};

export function getSubmissionPeriodOverride() {
  return { ...submissionPeriodOverride };
}

export function setSubmissionPeriodOverride(
  override: typeof submissionPeriodOverride,
) {
  submissionPeriodOverride = override;
}

export function isSubmissionPeriodActive(
  automaticStart: Date,
  automaticEnd: Date,
): boolean {
  const now = new Date();

  // If manually controlled, use the override
  if (submissionPeriodOverride.manuallyControlled) {
    return submissionPeriodOverride.isActive;
  }

  // Otherwise, use automatic schedule
  return now >= automaticStart && now <= automaticEnd;
}
