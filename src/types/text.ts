export interface ITextObj {
  text: string
  id: number
  correct: CorrectTextEnum
  errors: number
}

export enum CorrectTextEnum {
  NOT_CORRECT = 'NOT_CORRECT',
  CORRECT = 'CORRECT',
  LAST = 'LAST'
}
