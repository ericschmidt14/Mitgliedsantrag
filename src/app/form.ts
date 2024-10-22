export const getInitialValues = () => {
  return {
    gender: "m",
    title: "",
    firstName: "",
    lastName: "",
    dob: undefined,
    street: "",
    postalCode: "",
    city: "",
    country: "Deutschland",
    email: "",
    phone: "",
    mobile: "",
    entryDate: new Date(),
    membershipType: "",
    certificate: null,
    advertNumber: "",
    ofcnNumber: "",
    ofcnName: "",
    depositor: "",
    iban: "",
    acceptSepa: false,
    acceptCharter: false,
    acceptPrivacy: false,
    advertisement: "",
    advertisementOther: "",
    magazine: "",
  };
};

export interface FormValues {
  gender: string;
  title?: string;
  firstName: string;
  lastName: string;
  dob?: Date;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone?: string;
  mobile?: string;
  entryDate: Date;
  membershipType: string;
  certificate?: File | null;
  advertNumber?: string;
  ofcnNumber?: string;
  ofcnName?: string;
  depositor: string;
  iban: string;
  acceptSepa: boolean;
  acceptCharter: boolean;
  acceptPrivacy: boolean;
  advertisement: string;
  advertisementOther?: string;
  magazine: string;
}

export interface Member extends FormValues {
  token: string;
}
