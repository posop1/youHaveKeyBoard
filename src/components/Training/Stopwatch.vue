<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface IStopwatchProps {
  isStarted: boolean
}

const emits = defineEmits(['getSymbolsInSeconds'])

const props = defineProps<IStopwatchProps>()
const { t } = useI18n({ useScope: 'global' })

const minutes = ref<number>(0)
const sec = ref<number>(0)
const milSec = ref<number>(0)

let intervalVariable = 0
let timeleft = 0

const startTimer = () => {
  intervalVariable = setInterval(updateTime, 10)
}

const resetTimer = () => {
  stopTimer()
  timeleft = -10

  updateTime()
}

const stopTimer = () => {
  clearInterval(intervalVariable)
}

const updateTime = () => {
  timeleft = timeleft + 10

  sec.value = Math.floor(timeleft / 1000)

  if (sec.value > 60) {
    timeleft = -10
    minutes.value += 1
  }

  milSec.value = Math.floor((timeleft % 1000) / 10)
}

function getSymbolsInSeconds() {
  const params = {
    time:
      `${minutes.value < 10 ? '0' + minutes.value.toString() : minutes.value.toString()}:` +
      `${sec.value < 10 ? '0' + sec.value.toString() : sec.value.toString()}:` +
      `${milSec.value < 10 ? '0' + milSec.value.toString() : milSec.value.toString()}`
  }

  emits('getSymbolsInSeconds', params)
}

watch(
  () => props.isStarted,
  () => {
    if (props.isStarted) {
      resetTimer()
      startTimer()
    } else {
      stopTimer()
      getSymbolsInSeconds()
    }
  }
)
</script>

<template>
  <div class="bg-zinc-100 p-5 rounded-md text-center">
    <p>{{ t('trainingView.statistic.time') }}</p>
    <p class="font-medium">
      {{ minutes < 10 ? '0' + minutes.toString() : minutes.toString() }}:{{
        sec < 10 ? '0' + sec.toString() : sec.toString()
      }}
    </p>
  </div>
</template>
