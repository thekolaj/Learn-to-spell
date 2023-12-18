<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { exerciseName } from './exerciseState'
import { vFocus } from './exerciseControls'
</script>

<template>
  <h1>Congratulations, you have completed {{ exerciseName }}</h1>
  <RouterLink :to="{ name: 'home' }" v-focus>Back Home</RouterLink>
</template>
