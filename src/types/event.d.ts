type EventType = {
  title: string;
  description: string;
  eventDate: string;
  registrationDeadline: string;
  location: string;
  imageUrl?: string;
  category?: string;
};

type EventRegistrationType = {
  userEmail: string;
  userName: string;
  mobileNumber: number;
  userId: string;
  qrLink?: string;
  eventId: string;
};
