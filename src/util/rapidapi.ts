export const Themes = {
  Vetement: 'clothes clothing',
  Metier: 'job',
  Animal: 'species animal',
  Nourriture: 'food',
} as const

export const ThemeList = Object.keys(Themes) as Array<keyof typeof Themes>;

export type ThemesKey = keyof typeof Themes;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomLetter() {
  const ranNumber = getRandomInt(25);
  const letter = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const randomLowerCaseLetter = letter[ranNumber];
  return randomLowerCaseLetter.toUpperCase();
}
