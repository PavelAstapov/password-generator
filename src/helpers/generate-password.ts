import { letters, numbers, symbols } from "@/constants-module/constants"

export const randomPassword = (
  passwordLength: number,
  withSymbols: boolean,
  withNumbers: boolean,
  passwordType: 'Random' | 'Memorable' | 'Pin') => {
  const numbersOnly = [...numbers.split('')];
  const lettersOnly = [...letters.split('')];
  const symbolsOnly = [...symbols.split('')];

  switch(passwordType) {
    case 'Random':
      return (
        [
          ... withNumbers ? [ ...numbersOnly.sort(() => Math.random() - Math.random()).slice(0, passwordLength)] : [],
          ... withSymbols ? [ ...symbolsOnly.sort(() => Math.random() - Math.random()).slice(0, passwordLength)] : [],
          ...lettersOnly.sort(() => Math.random() - Math.random()).slice(0, passwordLength),
        ].sort(() => Math.random() - Math.random()).slice(0, passwordLength).join('')
      )
    case 'Memorable':
      return (
        [
          ...lettersOnly.sort(() => Math.random() - Math.random()).slice(0, 5),
          '-',
          ...numbersOnly.sort(() => Math.random() - Math.random()).slice(0, 3),
        ].join('').toLowerCase()
      )
    case 'Pin':
      return (
        [...numbersOnly.sort(() => Math.random() - Math.random()).slice(0, 4)].join('')
      )
    default:
      return "password1234"
  }
}