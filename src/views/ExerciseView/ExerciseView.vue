<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import data from '@/data'
import userData from '@/store/userData'
import vFocus from '@/components/utils'
import ExerciseControls from './ExerciseControls/ExerciseControls.vue'
import ResultsDisplay from './ResultsDisplay.vue'
import exerciseSetup from './dataControls/dataControls'
import { speechSettings, voiceList } from './speech/speechSettings'
import useSpeech from './speech/useSpeechControls'
import useExerciseControls from './ExerciseControls/useExerciseControls'

const route = useRoute()
const speech = useSpeech(speechSettings, voiceList)
const state = ref(exerciseSetup(data, userData, route.params))
const controls = useExerciseControls(speech, state)

watch(
  () => route.params.exercise,
  () => {
    state.value = exerciseSetup(data, userData, route.params)
  },
)
</script>

<template>
  <section
    @keydown.enter.prevent="controls.submitButton()"
    @keydown.tab.prevent="controls.playPauseButton()"
    @keydown.esc.prevent="speech.stopText()"
    tabindex="-1"
  >
    <div class="title">
      <h2>Exercise: {{ state.exerciseName }} {{ controls.completionText.value }}</h2>
      <button @click="controls.homeButton()" type="button">Home</button>
    </div>
    <textarea
      v-model="state.userInput"
      :readonly="state.isAnswerSubmitted"
      v-focus
      cols="50"
      rows="5"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      aria-label="text input"
      placeholder="Write what you hear."
    ></textarea>
    <ResultsDisplay
      :submitted="state.isAnswerSubmitted"
      :correct="state.isAnswerCorrect"
      :results="state.diffResults"
    />
    <ExerciseControls :controls="controls" :state="state" :stopText="speech.stopText" />
  </section>
</template>

<style scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
