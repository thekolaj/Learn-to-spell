<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
    <button @click="toggleDark()" type="button" class="mode">
      <span>{{ isDark ? 'Dark' : 'Light' }}</span>
    </button>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.mode {
  margin-left: auto;
  padding: 0.3rem;
  font-size: var(--large);
}
</style>
