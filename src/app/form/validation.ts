import { isValidIBAN } from "../lib/utils";
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
        "Bitte Geburtstag angeben"
      ),
      street: notEmptyValidation(
        values.street,
        "Bitte Straße & Nummer angeben"
      ),
      postalCode: postalCodeValidation(values.country, values.postalCode),
      city: notEmptyValidation(values.city, "Bitte Wohnort angeben"),
      country: notEmptyValidation(values.country, "Bitte Land angeben"),
    };
  }

  if (active === 2) {
    const parentAddressChecks = !values.parentAddressIsIdentical && {
      parentStreet: notEmptyValidation(
        values.parentStreet,
        "Bitte Straße & Nummer angeben"
      ),
      postalCode: postalCodeValidation(
        values.parentCountry,
        values.parentPostalCode
      ),
      parentCity: notEmptyValidation(
        values.parentCity,
        "Bitte Wohnort angeben"
      ),
      parentCountry: notEmptyValidation(
        values.parentCountry,
        "Bitte Land angeben"
      ),
    };

    const parentChecks = values.applicantType !== "self" && {
      ...parentAddressChecks,
      parentFirstName: notEmptyValidation(
        values.parentFirstName,
        "Bitte Vornamen angeben"
      ),
      parentLastName: notEmptyValidation(
        values.parentLastName,
        "Bitte Nachnamen angeben"
      ),
      parentDob: notEmptyValidation(
        values.parentDob?.toString(),
        "Bitte Geburtstag angeben"
      ),
      parentMemberNumber: values.parentIsMember
        ? values.parentMemberNumber === undefined ||
          values.parentMemberNumber === null ||
          values.parentMemberNumber < 1
          ? "Bitte Mitgliedsnummer angeben"
          : null
        : null,
    };

    return {
      email: emailValidation(values.email),
      ...parentChecks,
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

const postalCodeValidation = (country: string, postalCode: string) => {
  const postalCodeRules: { [key: string]: RegExp } = {
    DE: /^\d{5}$/, // Germany: 5 digits
    FR: /^\d{5}$/, // France: 5 digits
    IT: /^\d{5}$/, // Italy: 5 digits
    ES: /^\d{5}$/, // Spain: 5 digits
    NL: /^\d{4}\s?[A-Z]{2}$/, // Netherlands: 4 digits + 2 letters (e.g., 1234 AB)
    BE: /^\d{4}$/, // Belgium: 4 digits
    AT: /^\d{4}$/, // Austria: 4 digits
    DK: /^\d{4}$/, // Denmark: 4 digits
    CH: /^\d{4}$/, // Switzerland: 4 digits (e.g., 8001)
    LU: /^\d{4}$/, // Luxembourg: 4 digits (e.g., 1234)
    SE: /^\d{3}\s?\d{2}$/, // Sweden: 5 digits (e.g., 123 45)
    FI: /^\d{5}$/, // Finland: 5 digits
    NO: /^\d{4}$/, // Norway: 4 digits
    PL: /^\d{2}-\d{3}$/, // Poland: 2 digits + hyphen + 3 digits (e.g., 12-345)
    CZ: /^\d{3}\s?\d{2}$/, // Czech Republic: 5 digits (e.g., 123 45)
    SK: /^\d{3}\s?\d{2}$/, // Slovakia: 5 digits (e.g., 123 45)
    HU: /^\d{4}$/, // Hungary: 4 digits
    PT: /^\d{4}-\d{3}$/, // Portugal: 4 digits + hyphen + 3 digits (e.g., 1234-567)
    UK: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/, // UK: Complex (e.g., SW1A 1AA)
    US: /^\d{5}(-\d{4})?$/, // USA: 5 digits or ZIP+4 (e.g., 12345 or 12345-6789)
    CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // Canada: Alphanumeric (e.g., K1A 0B1)
    TR: /^\d{5}$/, // Turkey: 5 digits
  };

  if (postalCodeRules[country]) {
    return postalCodeRules[country].test(postalCode)
      ? null
      : "Bitte gültige PLZ angeben";
  }

  return notEmptyValidation(postalCode, "Bitte Postleitzahl angeben");
};
