const converToLatin = (input: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const latinDigits = "0123456789";

  if (!input.trim()) return "";

  input = input.replaceAll(",", "");

  for (let i = 0; i < 10; i++) {
    input = input.replace(new RegExp(persianDigits[i], "g"), latinDigits[i]);
  }

  return input;
};

export default converToLatin;
