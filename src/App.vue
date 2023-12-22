<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import error from '@/store/error'

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)

if (!('speechSynthesis' in window)) {
  error.value = 'Speech Synthesis not supported by your browser! Try a different one.'
}
</script>

<template>
  <header>
    <div v-if="error" class="error">
      {{ error }}
      <button type="button" @click="error = ''">✖️</button>
    </div>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'instructions' }">Instructions</RouterLink>
      <button @click="toggleDark()" type="button" class="mode">
        <span>{{ isDark ? 'Dark' : 'Light' }}</span>
      </button>
    </nav>
    <h1>Learn to Spell</h1>
  </header>
  <RouterView />
</template>

<style scoped>
nav {
  margin: 1rem 10% 0 auto;
}

button,
a {
  padding: 0.3rem;
  font-size: var(--large);
}

.error {
  background-color: var(--primary-bad);
  border-radius: var(--medium);
  padding: 0 1rem;
  text-align: center;
}

.error > button {
  border: 1px dotted black;
  background-color: transparent;
}
</style>
