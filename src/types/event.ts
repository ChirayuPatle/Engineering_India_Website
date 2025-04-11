export interface Prize {
  name: string;
  value: string;
}

export interface TimelineItem {
  time: string;
  activity: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RegistrationField {
  name: string;
  type: "text" | "email" | "file" | "number" | "date" | "textarea";
  required: boolean;
  placeholder?: string;
}

export interface UpiId {
  value: string;
}

export interface GeneralFormData {
  name: string;
  description: string;
  venue: string;
  mode: "Offline" | "Online" | "Hybrid";
  startDate: string;
  endDate: string;
  regStartDate: string;
  regEndDate: string;
  bannerImage: FileList;
  maxCapacity: number;
  registrationFee?: number;
  organizerContact: string;
  whatsappLink: string;
}

export interface EventDetailsFormData {
  prizes: Prize[];
  timeline: TimelineItem[];
  rules: string;
  faqs: FAQ[];
}

export interface RegistrationFormData {
  fields: RegistrationField[];
  upiIds: UpiId[];
  conclusionContent: string;
  qrCodeImage?: FileList;
}

export type CompleteFormData = GeneralFormData &
  EventDetailsFormData &
  RegistrationFormData;
