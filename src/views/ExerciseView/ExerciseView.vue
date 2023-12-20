<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import data from '@/data'
import userData from '@/store/userData'
import { vFocus } from '@/components/utils'
import SpeechSettingModal from './speech/SpeechSettingsModal.vue'
import exerciseSetup from './dataControls/dataControls'
import { speechSettings, voiceList } from './speech/speechSettings'
import useSpeech from './speech/useSpeechControls'
import useExerciseControls from './useExerciseControls'

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
  <div
    class="container"
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
      :class="{ disabled: state.isAnswerSubmitted }"
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
    <div class="results" v-html="state.resultsDisplay"></div>
    <div class="controls">
      <button @click="controls.submitButton()" type="button">
        {{ controls.submitButtonText.value }} <span>"Enter"</span>
      </button>
      <button @click="controls.playPauseButton()" type="button" :disabled="state.isAnswerSubmitted">
        {{ controls.playPauseButtonText.value }} <span>"Tab"</span>
      </button>
      <button @click="speech.stopText()" type="button">Stop <span>"Esc"</span></button>
      <SpeechSettingModal />
    </div>
  </div>
</template>

<style scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.controls {
  display: flex;
  flex-direction: column;
}

.controls > button {
  display: flex;
  justify-content: space-around;
}

.results > span {
  background-color: var(--primary-neutral);
  border-radius: 2px;
}

.correct {
  background-color: var(--button-color);
}

.wrong {
  background-color: var(--primary-bad);
}
</style>
