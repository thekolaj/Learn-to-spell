<script setup lang="ts">
import { RouterLink } from 'vue-router'
import data from '@/data/'
import userData from '@/store/userData'
import { statsAsString } from '@/store/userDataUtils'
</script>

<template>
  <template v-for="(category, catKey) in data" :key="catKey">
    <h2>{{ category.name }}: {{ category.description }}</h2>
    <template v-for="(value, key) in category.content" :key="key">
      <RouterLink :to="{ name: 'exercise', params: { category: catKey, exercise: key } }">
        {{ key }} {{ statsAsString(key, value.length, userData) }}
      </RouterLink>
    </template>
  </template>
</template>
