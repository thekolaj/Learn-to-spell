<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
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
const textAreaElement = ref<HTMLInputElement | null>(null)
const speech = useSpeech(speechSettings, voiceList)
const state = ref(exerciseSetup(data, userData, route.params))
const controls = useExerciseControls(speech, state, textAreaElement)

watch(
  () => route.params.exercise,
  () => {
    state.value = exerciseSetup(data, userData, route.params)
  },
)

onBeforeRouteLeave(() => {
  speech.stopText()
})
</script>

<template>
  <main
    @keydown.enter.prevent="controls.submitButton()"
    @keydown.tab.prevent="controls.playPauseButton()"
    @keydown.esc.prevent="speech.stopText()"
    tabindex="-1"
  >
    <div class="exercise-container">
      <h2>
        Exercise: {{ state.exerciseName }}<span>Correct: {{ controls.completionText.value }}</span>
      </h2>
      <textarea
        v-model="state.userInput"
        ref="textAreaElement"
        :readonly="state.isAnswerSubmitted"
        v-focus
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        aria-label="text input"
        placeholder="Write what you hear"
      ></textarea>
      <ResultsDisplay
        :submitted="state.isAnswerSubmitted"
        :correct="state.isAnswerCorrect"
        :results="state.diffResults"
      />
    </div>
    <ExerciseControls :controls="controls" :state="state" :stopText="speech.stopText" />
  </main>
</template>

<style scoped>
.exercise-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
}

textarea {
  font-size: var(--x-large);
  width: 98%;
  height: 11rem;
  background-color: var(--primary-light);
}

textarea[readonly] {
  background-color: var(--primary-neutral);
}
</style>
