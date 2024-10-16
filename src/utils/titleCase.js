// Utility function to format strings into title case
const titleCase = (label, delim = ' ') => {
  return label
    .split(delim) // Split the string by delimiter
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back with spaces
};

export default titleCase;
