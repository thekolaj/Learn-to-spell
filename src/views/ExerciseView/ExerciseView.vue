<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useRoute } from 'vue-router'
import userData from '@/store/userData'
import { getExerciseData, type ExerciseData } from '@/components/userDataUtils'
import * as speechControls from './speech/speechControls'
import SpeechSettingModal from './speech/SpeechSettingsModal.vue'

const route = useRoute()
const userInput = ref('')
const answer = ref('')
// let exerciseData: ExerciseData
// const currentText = computed()
// watchEffect(() => {
//   exerciseData = getExerciseData(route.params.exercise, userData)
// })
</script>

<template>
  <label for="text">Text Input:</label>
  <textarea id="text" cols="50" rows="5" v-model="userInput"></textarea>
  <p>{{ answer }}</p>

  <div>
    <button @click="speechControls.playPauseText(userInput)" type="button">Play</button>
    <button @click="speechControls.stopText()" type="button">Stop</button>
    <SpeechSettingModal />
    <p>{{ speechControls.playing }}</p>
  </div>
</template>
