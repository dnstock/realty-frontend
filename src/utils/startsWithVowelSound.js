// Helper function to check if word starts with vowel sound
const startsWithVowelSound = (word) => {
  const vowelSounds = ['a', 'e', 'i', 'o', 'u'];
  return vowelSounds.includes(word.charAt(0).toLowerCase());
};

export default startsWithVowelSound;
