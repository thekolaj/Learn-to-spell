<script setup lang="ts">
import vFocus from '@/components/utils'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Congratulations!</h1>
    <h2>
      You have completed '<span>{{ $route.params.exercise }}</span
      >'
    </h2>
    <RouterLink :to="{ name: 'home' }" v-focus>Back to Title</RouterLink>
  </main>
</template>

<style scoped>
h1 {
  color: var(--primary-highlight);
}

span {
  color: var(--primary-good);
}

a {
  margin: 2rem;
}
</style>
