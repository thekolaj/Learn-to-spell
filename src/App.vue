<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
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
</style>
