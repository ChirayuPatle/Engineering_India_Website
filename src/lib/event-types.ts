
export type RegistrationMode = 'INDIVIDUAL' | 'TEAM';

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: string;
  poster: string | null;
  registration_mode: RegistrationMode;
  number_of_people_registered: number;
  created_at: string;
  updated_at: string;
  // Additional fields for UI
  price?: number;
  faq?: FAQ[];
  gallery?: string[];
  prizes?: Prize[];
  schedule?: ScheduleItem[];
  organizer?: {
    name: string;
    email: string;
    phone: string;
    website?: string;
  };
  tags?: string[];
  locationDetails?: {
    address: string;
    city: string;
    country: string;
    mapUrl?: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Prize {
  position: string;
  description: string;
  value?: string;
  image?: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  location?: string;
  description?: string;
  speakers?: string[];
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  teamName?: string;
  teamMembers?: { name: string; email: string }[];
  paymentInfo?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export interface Ticket {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  dateIssued: string;
  startDate: string;
  venue: string;
  qrCode: string;
}
