export const formatIBAN = (iban: string) => {
  return iban
    .replace(/\s/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const isValidIBAN = (iban: string) => {
  const ibanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  const formattedIban = iban.replace(/\s+/g, "").toUpperCase();

  if (!ibanPattern.test(formattedIban)) {
    return false;
  }

  const rearrangedIban = formattedIban.slice(4) + formattedIban.slice(0, 4);
  const numericIban = rearrangedIban.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );

  let remainder = numericIban;
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9);
    remainder =
      (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
  }

  return parseInt(remainder, 10) % 97 === 1;
};
