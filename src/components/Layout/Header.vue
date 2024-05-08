<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useLanguageStore } from '@/stores/language'
import { LANGUAGE } from '@/types/locale'

const { t, locale } = useI18n({ useScope: 'global' })

const { changeLanguage } = useLanguageStore()
</script>

<template>
  <header
    class="bg-emerald-400 max-w-4xl w-full rounded-md m-5 flex justify-between items-center p-3"
  >
    <RouterLink to="/">
      <h1 class="text-2xl text-slate-50 font-medium">YHK</h1>
    </RouterLink>
    <ul class="text-black flex gap-2">
      <router-link
        to="/"
        class="bg-white py-1 px-3 rounded-md w-28 text-center hover:bg-emerald-100 font-medium"
        >{{ t('header.links.home') }}</router-link
      >
      <router-link
        to="/training"
        class="bg-white py-1 px-3 rounded-md text-center w-28 font-medium hover:bg-emerald-100"
        >{{ t('header.links.training') }}</router-link
      >
    </ul>
    <DropdownMenu>
      <DropdownMenuTrigger class="bg-white py-1 px-3 rounded-md text-center hover:bg-emerald-100">{{
        t('language.short')
      }}</DropdownMenuTrigger>
      <DropdownMenuContent class="flex flex-col items-center">
        <DropdownMenuLabel>{{ t('language.this') }}</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button
            @click="
              () => {
                changeLanguage(LANGUAGE.RU)
                locale = LANGUAGE.RU
              }
            "
            >{{ LANGUAGE.RU.toLocaleUpperCase() }}</Button
          >
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            @click="
              () => {
                changeLanguage(LANGUAGE.EN)
                locale = LANGUAGE.EN
              }
            "
            >{{ LANGUAGE.EN.toLocaleUpperCase() }}</Button
          >
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
