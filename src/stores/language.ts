import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useLanguageStore = defineStore('language', () => {
  const localStorageLanguage = useLocalStorage('language', '').value

  const currentLanguage = ref(localStorageLanguage ? localStorageLanguage : 'en')

  function changeLanguage(language: string) {
    currentLanguage.value = language

    useLocalStorage('language', '').value = language
  }

  return {
    currentLanguage,
    changeLanguage
  }
})
