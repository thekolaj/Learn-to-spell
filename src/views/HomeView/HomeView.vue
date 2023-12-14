<script setup lang="ts">
import { RouterLink } from 'vue-router'
import categories from '@/data/'
</script>

<template>
  <template v-for="(category, catKey) in categories" :key="catKey">
    <h2>{{ category.name }}: {{ category.description }}</h2>
    <template v-for="key in Object.keys(category.content)" :key="key">
      <RouterLink :to="{ name: 'exercise', params: { category: catKey, exercise: key } }">
        {{ key }}
      </RouterLink>
    </template>
  </template>
</template>
