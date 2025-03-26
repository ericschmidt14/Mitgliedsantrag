export const getInitialValues = () => {
  return {
    applicantType: "self",
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
    parentIsMember: false,
    parentMemberNumber: null,
    parentTitle: "",
    parentGender: "Männlich",
    parentFirstName: "",
    parentLastName: "",
    parentDob: undefined,
    parentStreet: "",
    parentPostalCode: null,
    parentCity: "",
    parentCountry: "Deutschland",
    parentEmail: "",
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
  applicantType: string;
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
  parentIsMember: boolean;
  parentMemberNumber: number | null;
  parentGender: string;
  parentTitle?: string;
  parentFirstName: string;
  parentLastName: string;
  parentDob?: Date;
  parentStreet: string;
  parentPostalCode: number | null;
  parentCity: string;
  parentCountry: string;
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
