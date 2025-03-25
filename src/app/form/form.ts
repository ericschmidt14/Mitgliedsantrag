export const getInitialValues = () => {
  return {
    gender: "Männlich",
    title: "",
    firstName: "",
    lastName: "",
    dob: undefined,
    street: "",
    postalCode: null,
    city: "",
    country: "Deutschland",
    email: "",
    phone: "",
    mobile: "",
    entryDate: new Date(),
    membershipType: "",
    certificate: null,
    certificateName: "",
    advertNumber: null,
    ofcnNumber: "",
    ofcnName: "",
    depositor: "",
    iban: "",
    bic: "",
    acceptSepa: false,
    acceptCharter: false,
    advertisement: "",
    advertisementOther: "",
    magazine: "Digital-Version",
    id: "Digital-Version",
    newsletter: false,
  };
};

export interface FormValues {
  gender: string;
  title?: string;
  firstName: string;
  lastName: string;
  dob?: Date;
  street: string;
  postalCode: number | null;
  city: string;
  country: string;
  email: string;
  phone?: string;
  mobile?: string;
  entryDate: Date;
  membershipType: string;
  certificate?: File | null;
  certificateName?: string;
  advertNumber?: number | null;
  ofcnNumber?: string;
  ofcnName?: string;
  depositor: string;
  iban: string;
  bic: string;
  acceptSepa: boolean;
  acceptCharter: boolean;
  advertisement: string;
  advertisementOther?: string;
  magazine: string;
  id: string;
  newsletter: boolean;
}
