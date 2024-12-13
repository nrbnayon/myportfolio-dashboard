/**
 * Generates a URL-friendly slug from input text
 * @param {string} text - The text to convert into a slug
 * @returns {string} A sanitized, lowercase slug
 */
export const generateSlug = (text) => {
  if (!text || typeof text !== "string") return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

/**
 * Converts a slug back to a readable title
 * @param {string} slug - The slug to convert
 * @returns {string} A formatted title with capitalized words
 */
export const removeSlug = (slug) => {
  const words = slug.split("-");
  const convertedWords = words.map((word) => {
    if (word === "and") {
      return "&";
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return convertedWords.join(" ");
};
