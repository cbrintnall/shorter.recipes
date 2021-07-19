const UNICODE_FORWARD_FLASH = "\u2044";

const isFractionTuple = (numbers: number[]): numbers is [number, number] => {
  return numbers.length === 2;
}

export const vulgarToNumbers = (vulgarFraction: string): [number, number] | number => {
  try {
    const numbers =
      vulgarFraction
        .normalize("NFKD")
        .split(UNICODE_FORWARD_FLASH)
        .map(frac => Number.parseFloat(frac))

    if (isFractionTuple(numbers)) {
      return numbers;
    } else {
      // Rely on try catch to release execution from function
      throw new Error('Couldn\'t resolve vulgar fraction');
    }
  } catch (_) {
    return 0.0;
  }
}