<script setup lang="ts">
import speechSettings from './SpeechSettings'
import { voiceList } from './SpeechControls'
</script>

<template>
  <label for="speed">Speed</label>
  <input type="number" id="speed" min=".5" max="3" step=".5" v-model="speechSettings.speed" />
  <label for="delay">Delay</label>
  <input type="checkbox" id="delay" v-model="speechSettings.delay" />
  <label for="voices">Select a voice</label>
  <select id="voices" v-model="speechSettings.voiceIndex">
    <option v-for="(voice, index) in voiceList" :key="voice.name" :value="index">
      {{ voice.name }} ({{ voice.lang }})
    </option>
  </select>
</template>
