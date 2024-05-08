<template>
  <main>
    <div class="text-center">
      <h2 class="text-3xl font-semibold my-9">You Have Keyboard</h2>
      <p class="text-2xl max-w-4xl mb-9">{{ $t('homeView.slogan') }}</p>
      <RouterLink
        to="/training"
        class="bg-emerald-400 py-2 px-7 rounded-md w-28 text-center hover:bg-emerald-500 font-medium text-white text-xl"
        >{{ $t('header.links.training') }}</RouterLink
      >
    </div>
  </main>
</template>
