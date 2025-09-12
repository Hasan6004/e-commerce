export default function formatPrice(input: string | number): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const latinDigits = "0123456789";

  // 1) normalize to string
  let s = String(input).trim();
  if (!s) return "";

  // 2) convert Persian digits → Latin digits (so grouping logic works)
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(persianDigits[i], "g"), latinDigits[i]);
  }

  // 3) remove everything except Latin digits (note: Arabic-Indic digits are NOT handled
  //    intentionally per your request and will be removed)
  s = s.replace(/[^0-9]/g, "");
  if (!s) return "";

  // 4) add ASCII comma every 3 digits
  s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 5) convert Latin digits back to Persian digits
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(latinDigits[i], "g"), persianDigits[i]);
  }

  return s;
}
