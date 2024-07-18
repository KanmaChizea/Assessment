export const areAllPropertiesUndefined = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      return false;
    }
  }
  return true;
};

export const getRandomInteger = () => {
  const randomFloat = Math.random();
  const randomInteger = Math.floor(randomFloat * (1000000 - 0 + 1)) + 0;
  return randomInteger;
};

export function getInitials(inputString: string, length?: number): string {
  const words = inputString?.trim().split(' ') || '';
  const initialLength = length ?? words.length;
  let initials = '';

  if (initialLength === 0) {
    return '';
  }

  for (let i = 0; i < initialLength && i < 2; i++) {
    initials += words[i][0].toUpperCase();
  }

  return initials;
}
