import { FormValues } from "./form";
import { isValidIBAN } from "./utils";

export function validateForm(active: number, values: FormValues) {
  if (active === 0) {
    return {
      firstName: notEmptyValidation(values.firstName, "Bitte Vornamen angeben"),
      lastName: notEmptyValidation(values.lastName, "Bitte Nachnamen angeben"),
      dob: notEmptyValidation(
        values.dob?.toString(),
        "Bitte Nachnamen angeben"
      ),
    };
  }

  if (active === 1) {
    return {
      street: notEmptyValidation(
        values.street,
        "Bitte Straße & Nummer angeben"
      ),
      postalCode: postalCodeValidation(values.postalCode),
      city: notEmptyValidation(values.city, "Bitte Wohnort angeben"),
      country: notEmptyValidation(values.country, "Bitte Land angeben"),
    };
  }

  if (active === 2) {
    return {
      email: emailValidation(values.email),
    };
  }

  if (active === 3) {
    return {
      entryDate: notEmptyValidation(
        values.entryDate?.toString(),
        "Bitte Eintrittsdatum angeben"
      ),
      membershipType: notEmptyValidation(
        values.membershipType,
        "Bitte Beitragsart wählen"
      ),
    };
  }

  if (active === 4) {
    return {
      acceptSepa: values.acceptSepa ? null : "",
      depositor: notEmptyValidation(
        values.depositor,
        "Bitte Kontoinhaber angeben"
      ),
      iban: ibanValidation(values.iban),
      acceptCharter: values.acceptCharter ? null : "",
      acceptPrivacy: values.acceptPrivacy ? null : "",
    };
  }

  return {};
}

const notEmptyValidation = (value: string | undefined, error: string) => {
  return value == undefined || value.trim().length < 1 ? error : null;
};

const postalCodeValidation = (code: string) => {
  return /^[0-9][0-9][0-9][0-9][0-9]$/.test(code)
    ? null
    : "Ungültige Postleitzahl";
};

const emailValidation = (email: string) => {
  return /\S+@\S+\.\S+/.test(email) ? null : "Ungültige Mailadresse";
};

const ibanValidation = (iban: string) => {
  return isValidIBAN(iban) ? null : "Ungültige IBAN";
};
