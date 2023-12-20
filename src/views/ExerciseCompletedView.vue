<script setup lang="ts">
import { vFocus } from '@/components/utils'
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1>Congratulations, you have completed {{ $route.params.exercise }}</h1>
  <RouterLink :to="{ name: 'home' }" v-focus>Back Home</RouterLink>
</template>
