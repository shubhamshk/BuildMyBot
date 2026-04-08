/**
 * List of words that PayPal may flag or reject.
 * When sending product/plan names to PayPal these words are replaced with "NICE".
 * The display name shown on the website is NOT affected – only the PayPal payload.
 */
const NSFW_WORDS = ["nsfw", "adult", "xxx", "porn", "hentai", "explicit", "erotic"];

/**
 * Replaces every occurrence of a flagged word (case-insensitive) with "NICE"
 * so that the resulting string is safe to send to PayPal.
 *
 * Examples:
 *   "NSFW-Safe Image + Prompt Pack"  →  "NICE-Safe Image + Prompt Pack"
 *   "Mom NSFW Free Images"           →  "Mom NICE Free Images"
 */
export function sanitizeForPayPal(name: string): string {
  let result = name;
  for (const word of NSFW_WORDS) {
    // Replace whole or partial occurrences, preserving surrounding characters
    const regex = new RegExp(word, "gi");
    result = result.replace(regex, "NICE");
  }
  return result;
}
