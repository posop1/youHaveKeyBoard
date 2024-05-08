<script setup lang="ts">
import { ref, watch } from 'vue'

import { Input } from '@/components/ui/input'
import { CorrectTextEnum, type ITextObj } from '@/types/text'

const data = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula erat ut tortor semper scelerisque. Aliquam hendrerit sem quis magna tincidunt, sed cursus eros vulputate. Ut sit amet rhoncus nulla. In interdum porttitor auctor. Vivamus scelerisque dictum neque, id lobortis velit malesuada in. Integer facilisis porttitor magna sed pellentesque. Vivamus augue sapien, aliquam ut sapien quis, accumsan mollis ipsum. Aliquam consequat interdum odio in aliquet.`

const textObj = ref<ITextObj[]>(
  data.split(' ').map((e) => {
    const index = Math.random() * 100000

    if (e[e.length - 1] === ',') {
      return { text: e.split(',')[0], id: Math.trunc(index), correct: CorrectTextEnum.CORRECT }
    } else {
      return { text: e, id: Math.trunc(index), correct: CorrectTextEnum.CORRECT }
    }
  })
)
textObj.value.push({ text: ' ', id: 0, correct: CorrectTextEnum.LAST })

const inputData = ref<string>('')
const currentStringIndex = ref<number>(0)

const isStopped = ref<boolean>(false)

function check() {
  if (inputData.value.split(' ').join('') !== textObj.value[currentStringIndex.value].text) {
    textObj.value[currentStringIndex.value].correct = CorrectTextEnum.NOT_CORRECT
  }

  currentStringIndex.value += 1
  inputData.value = ''
}

watch(
  () => currentStringIndex.value,
  () => {
    if (currentStringIndex.value === textObj.value.length - 1) {
      isStopped.value = true
    }
  }
)
</script>

<template>
  <div class="max-w-4xl flex flex-col gap-10">
    <div class="text-xl text-justify flex flex-wrap gap-2">
      <div v-for="item in textObj" :key="item.id">
        <span
          v-if="item.id === textObj[currentStringIndex].id && item.correct !== CorrectTextEnum.LAST"
          class="bg-emerald-400 rounded-sm p-1"
          >{{ item.text + ' ' }}
        </span>

        <span
          v-else-if="item.correct === CorrectTextEnum.NOT_CORRECT"
          class="bg-red-400 rounded-sm p-1"
          >{{ item.text + ' ' }}</span
        >

        <span v-else class="p-1">{{ item.text + ' ' }}</span>
      </div>
    </div>

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
