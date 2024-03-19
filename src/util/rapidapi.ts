export enum Themes {
  Vetement = 'clothes clothing',
  Metier = 'job',
  Animal = 'species animal',
  Nourriture = 'food',
}
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
