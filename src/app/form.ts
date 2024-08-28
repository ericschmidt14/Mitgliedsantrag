export const getInitialValues = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfNextMonth = new Date(year, month + 1, 1);

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
    entryDate: firstDayOfNextMonth,
    membershipType: "",
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
