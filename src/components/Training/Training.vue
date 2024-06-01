<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Statistic from './Statistic.vue'
import { CorrectTextEnum, type ITextObj } from '@/types/text'
import { getText } from '@/services/getText'
import { useLanguageStore } from '@/stores/language'

const { currentLanguage } = useLanguageStore()
const { t } = useI18n({ useScope: 'global' })

const textLanguage = ref<string>(currentLanguage)
const textObj = ref<ITextObj[]>([])

const inputData = ref<string>('')
const currentStringIndex = ref<number>(0)

const allSymbolsCount = computed(() => textObj.value.reduce((a, b) => a + b.text.length, -1))
const allErrors = ref<number>(0)
const accuracy = ref<string>('')
const allSymbols = computed(() => {
  return textObj.value.map((item) => item.text).join(' ')
})

const isStopped = ref<boolean>(false)
const timerIsStarted = ref<boolean>(false)

function getTextObj() {
  const text = getText(textLanguage.value)

  textObj.value = text
}

function check() {
  if (inputData.value.split(' ').join('') !== textObj.value[currentStringIndex.value].text) {
    const correctWord = textObj.value[currentStringIndex.value].text.split('')
    const word = inputData.value.split(' ').join('').split('')

    for (let i = 0; i < correctWord.length; i++) {
      if (word[i] !== correctWord[i]) {
        textObj.value[currentStringIndex.value].errors += 1
      }
    }

    textObj.value[currentStringIndex.value].correct = CorrectTextEnum.NOT_CORRECT
  }

  currentStringIndex.value += 1
  inputData.value = ''
}

function getStatistic() {
  allErrors.value = textObj.value.reduce((a, b) => a + b.errors, 0)

  const correctSymbols = allSymbolsCount.value - allErrors.value

  accuracy.value = ((correctSymbols / allSymbolsCount.value) * 100).toFixed(0)
}

function retryTraining() {
  textObj.value = getText(textLanguage.value)

  currentStringIndex.value = 0
  inputData.value = ''
  isStopped.value = false
}

watch(
  () => currentStringIndex.value,
  () => {
    if (currentStringIndex.value === 1) {
      timerIsStarted.value = true
    }
    if (currentStringIndex.value === textObj.value.length - 1) {
      getStatistic()
      isStopped.value = true
      timerIsStarted.value = false
    }
  }
)

watch(
  () => textLanguage.value,
  () => {
    getTextObj()
  }
)

onMounted(() => {
  getTextObj()
})
</script>

<template>
  <div class="max-w-4xl flex flex-col items-center gap-10">
    <div class="w-full flex gap-6">
      <Button
        @click="retryTraining"
        class="bg-emerald-400 py-2 px-7 hover:bg-emerald-100 hover:text-black w-1/6"
        >{{ t('trainingView.refresh') }}</Button
      >
      <Select v-model="textLanguage">
        <SelectTrigger class="w-1/6 border-emerald-400">
          <SelectValue :placeholder="t('trainingView.selectLanguage')" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ru"> RU </SelectItem>
          <SelectItem value="en"> EN </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="text-3xl flex flex-wrap items-center gap-2">
      <div v-for="item in textObj" :key="item.id">
        <p
          v-if="item.id === textObj[currentStringIndex].id && item.correct !== CorrectTextEnum.LAST"
          class="bg-emerald-400 rounded-sm p-1"
        >
          {{ item.text + ' ' }}
        </p>

        <p
          v-else-if="item.correct === CorrectTextEnum.NOT_CORRECT"
          class="bg-red-400 rounded-sm p-1"
        >
          {{ item.text + ' ' }}
        </p>

        <p v-else class="p-1">{{ item.text + ' ' }}</p>
      </div>
    </div>

    <Statistic
      :is-started="timerIsStarted"
      :accuracy="accuracy"
      :all-symbols="allSymbols.length - 1"
      :class="{ hidden: !isStopped }"
    />

    <Button
      @click="retryTraining"
      v-if="isStopped"
      class="bg-emerald-400 py-2 px-7 hover:bg-emerald-100 hover:text-black"
      >{{ t('trainingView.repeatAgain') }}</Button
    >

    <Input
      v-if="!isStopped"
      type="text"
      v-model="inputData"
      @keydown.space="check"
      class="text-xl border-emerald-400 p-6"
    />
    <Input
      v-else
      disabled
      type="text"
      v-model="inputData"
      @keydown.space="check"
      class="text-xl border-emerald-400 p-6"
    />
  </div>
</template>
