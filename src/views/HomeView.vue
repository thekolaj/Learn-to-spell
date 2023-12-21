<script setup lang="ts">
import { RouterLink } from 'vue-router'
import data from '@/data/'
import userData from '@/store/userData'
import { statsAsString } from '@/store/userDataUtils'
</script>

<template>
  <main>
    <template v-for="(category, catKey) in data" :key="catKey">
      <h2>{{ category.name }}: {{ category.description }}</h2>
      <div class="button-box">
        <template v-for="(value, key) in category.content" :key="key">
          <RouterLink :to="{ name: 'exercise', params: { category: catKey, exercise: key } }">
            <span>{{ key }}</span> {{ statsAsString(key, value.length, userData) }}
          </RouterLink>
        </template>
      </div>
    </template>
  </main>
</template>

<style scoped>
a {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
}

.button-box {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.6rem;
  padding: 0.5rem;
  border-radius: var(--v-large);
  border: 1px solid var(--text-color);
  box-shadow: 0 0 0.5rem var(--text-color);
}

@media (width >= 800px) {
  .button-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.2rem 1rem;
    justify-items: center;
  }
}
</style>
