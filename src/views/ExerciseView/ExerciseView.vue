<script setup lang="ts">
import { ref } from 'vue'
import { playPauseText, playing, stopText } from './SpeechControls'
import speechSettings from './SpeechSettings'

const text = ref('')
</script>

<template>
  <label for="text">Text Input:</label>
  <textarea id="text" cols="30" rows="10" v-model="text"></textarea>
  <button
    @click="
      playPauseText(text, speechSettings.speed, speechSettings.voiceIndex, speechSettings.delay)
    "
    type="button"
  >
    Play
  </button>
  <button @click="stopText()" type="button">Stop</button>

  <p>{{ playing }}</p>
</template>
