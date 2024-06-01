import { LANGUAGE } from '@/types/locale'
import { CorrectTextEnum } from '@/types/text'

function getRandomText(language: string) {
  if (language === LANGUAGE.EN) {
    return `The only way to type with speed and accuracy is to use all ten fingers. To learn the right fingering technique, use a method adapted to your keyboard.`
  } else {
    return `Единственный способ печатать быстро и точно использовать все десять пальцев. Чтобы научиться правильной технике аппликатуры, используйте метод, адаптированный к вашей клавиатуре.`
  }
}

export function getText(language: string) {
  const data = getRandomText(language)

  const formattedText = data
    .split(',')
    .join(' ,')
    .split('.')
    .join(' .')
    .split(' ')
    .map((e) => {
      const index = Math.random() * 100000

      return { text: e, id: Math.trunc(index), correct: CorrectTextEnum.CORRECT, errors: 0 }
    })

  formattedText.push({ text: ' ', id: 0, correct: CorrectTextEnum.LAST, errors: 0 })

  return formattedText
}
