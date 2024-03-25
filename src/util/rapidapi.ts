export const Themes = {
  Vetement: 'clothes clothing',
  Metier: 'job',
  Animal: 'species animal',
  Nourriture: 'food',
} as const

export const ThemeValueList = Object.values(Themes)
export const ThemeKeyList = Object.keys(Themes) as ThemesKey[]

export type ThemesKey = keyof typeof Themes;
export type ThemesValue = typeof Themes[ThemesKey];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomLetter(exclude: string[]) {
  const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].filter((v) => !exclude.includes(v));

  const ranNumber = getRandomInt(letters.length - 1);
  
  const randomLowerCaseLetter = letters[ranNumber];
  return randomLowerCaseLetter.toUpperCase();
}
