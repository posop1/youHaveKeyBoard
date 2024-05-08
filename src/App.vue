<script setup lang="ts">
import { onMounted } from 'vue'

import Layout from './components/Layout/Layout.vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from './stores/language'

const { locale } = useI18n({ useScope: 'global' })
const { currentLanguage } = useLanguageStore()

onMounted(() => {
  locale.value = currentLanguage
})
</script>

<template>
  <Layout />
</template>
