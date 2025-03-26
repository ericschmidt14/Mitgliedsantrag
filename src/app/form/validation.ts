import { isValidIBAN } from "../utils";
import { FormValues } from "./form";

export function validateForm(active: number, values: FormValues) {
  if (active === 0) {
    return {};
  }

  if (active === 1) {
    return {
      firstName: notEmptyValidation(values.firstName, "Bitte Vornamen angeben"),
      lastName: notEmptyValidation(values.lastName, "Bitte Nachnamen angeben"),
      dob: notEmptyValidation(
        values.dob?.toString(),
        "Bitte Nachnamen angeben"
      ),
      street: notEmptyValidation(
        values.street,
        "Bitte Straße & Nummer angeben"
      ),
      postalCode:
        values.postalCode == undefined || values.postalCode < 1
          ? "Bitte Postleitzahl angeben"
          : null,
      city: notEmptyValidation(values.city, "Bitte Wohnort angeben"),
      country: notEmptyValidation(values.country, "Bitte Land angeben"),
    };
  }

  if (active === 2) {
    return {
      email: emailValidation(values.email),
      parentMemberNumber: values.parentIsMember
        ? values.parentMemberNumber === undefined ||
          values.parentMemberNumber === null ||
          values.parentMemberNumber < 1
          ? "Bitte Mitgliedsnummer angeben"
          : null
        : null,
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
      bic: notEmptyValidation(values.bic, "Bitte BIC angeben"),
    };
  }

  if (active === 5) {
    return {
      magazin: notEmptyValidation(
        values.magazine,
        "Bitte Medium für Mitgliedermagazin wählen"
      ),
      acceptCharter: values.acceptCharter ? null : "",
    };
  }

  return {};
}

const notEmptyValidation = (value: string | undefined, error: string) => {
  return value == undefined || value.trim().length < 1 ? error : null;
};

const emailValidation = (email: string) => {
  return /\S+@\S+\.\S+/.test(email) ? null : "Ungültige Mailadresse";
};

const ibanValidation = (iban: string) => {
  return isValidIBAN(iban) ? null : "Ungültige IBAN";
};
