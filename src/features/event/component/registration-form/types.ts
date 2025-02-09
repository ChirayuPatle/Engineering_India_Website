export interface RegistrationData {
  username: string;
  email: string;
  college: string;
  gender: string;
  candidateType: string;
  isTeam: boolean;
  teamName?: string;
  teamMembers?: {
    name: string;
    email: string;
    college: string;
    phone: string;
  }[];
  country: string;
  paymentProof?: File;
}
