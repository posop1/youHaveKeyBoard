<script setup lang="ts">
import { RouterView } from 'vue-router'

import Header from './Header.vue'
</script>

<template>
  <div class="flex flex-col items-center bg-zinc-100 min-h-dvh p-3">
    <Header />
    <RouterView />
  </div>
</template>
