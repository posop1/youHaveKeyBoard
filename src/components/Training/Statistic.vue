<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Stopwatch from './Stopwatch.vue'
import { ref } from 'vue'

interface IStatisticProps {
  isStarted: boolean
  accuracy: string
  allSymbols: number
}

const props = defineProps<IStatisticProps>()
const { t } = useI18n({ useScope: 'global' })

const symbolsInSeconds = ref(0)

function getSymbolsInSeconds(params: { time: string }) {
  const { time } = params

  const minutes = Number(time.split(':')[0])
  const seconds = Number(time.split(':')[1])
  const minutesInSeconds = minutes > 0 ? minutes * 60 : 0

  const secResult = (seconds + minutesInSeconds) / 60

  symbolsInSeconds.value = props.allSymbols / secResult
}
</script>

<template>
  <div class="bg-emerald-400 max-w-4xl rounded-md m-5 flex gap-10 justify-center items-center p-3">
    <div class="bg-zinc-100 p-5 rounded-md text-center">
      <p>{{ t('trainingView.statistic.accuracy') }}</p>
      <p class="font-medium">{{ props.accuracy }}%</p>
    </div>

    <div class="bg-zinc-100 p-5 rounded-md text-center">
      <p>{{ t('trainingView.statistic.symbolsInSeconds') }}</p>
      <p class="font-medium">{{ symbolsInSeconds.toFixed(0) }}</p>
    </div>

    <Stopwatch :is-started="props.isStarted" @get-symbols-in-seconds="getSymbolsInSeconds" />
  </div>
</template>
