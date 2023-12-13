<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1>Hello world</h1>
  <RouterLink :to="{ name: 'exercise', params: { exercise: 'good-one' } }">Exercise</RouterLink>
</template>
