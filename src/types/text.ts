export interface ITextObj {
  text: string
  id: number
  correct: CorrectTextEnum
}

export enum CorrectTextEnum {
  NOT_CORRECT = 'NOT_CORRECT',
  CORRECT = 'CORRECT',
  LAST = 'LAST'
}
