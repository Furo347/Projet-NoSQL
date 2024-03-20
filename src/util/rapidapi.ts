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
  const ranNumber = getRandomInt(25);
  const letter = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].filter((v) => !exclude.includes(v));
  const randomLowerCaseLetter = letter[ranNumber];
  return randomLowerCaseLetter.toUpperCase();
}
