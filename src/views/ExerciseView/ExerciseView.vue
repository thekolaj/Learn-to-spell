<script setup lang="ts">
import { ref } from 'vue'
import { playPauseText, playing, stopText } from './speech/SpeechControls'
import SpeechSettingModal from './speech/SpeechSettingsModal.vue'

const text = ref('')
</script>

<template>
  <label for="text">Text Input:</label>
  <textarea id="text" cols="30" rows="10" v-model="text"></textarea>
  <button @click="playPauseText(text)" type="button">Play</button>
  <button @click="stopText()" type="button">Stop</button>
  <SpeechSettingModal />
  <p>{{ playing }}</p>
</template>
