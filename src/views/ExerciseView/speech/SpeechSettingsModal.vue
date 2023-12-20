<script setup lang="ts">
import { ref } from 'vue'
import { vFocus } from '@/components/utils'
import { speechSettings, voiceList } from './speechSettings'

const isModalVisible = ref(false)

function toggleModal() {
  isModalVisible.value = !isModalVisible.value
}
</script>

<template>
  <button type="button" @click="toggleModal()">Speech Settings</button>
  <Transition name="modal">
    <div
      v-if="isModalVisible"
      class="modal-mask"
      tabindex="-1"
      @click.self="toggleModal()"
      @keydown.enter.stop="toggleModal()"
      @keydown.esc.stop="toggleModal()"
    >
      <div class="modal-container">
        <button class="close-btn" type="button" @click="toggleModal()">X</button>
        <label for="preview-speed">Preview Speed</label>
        <input
          type="number"
          id="preview-speed"
          min=".1"
          max="3"
          step=".1"
          v-model="speechSettings.speedPreview"
        />
        <label for="speed">Speed</label>
        <input
          type="number"
          id="speed"
          min=".1"
          max="3"
          step=".1"
          v-model="speechSettings.speed"
          v-focus
        />
        <label for="delay">Delay</label>
        <input type="checkbox" id="delay" v-model="speechSettings.delay" />
        <label for="voices">Select a voice</label>
        <select id="voices" v-model="speechSettings.voiceIndex">
          <option v-for="(voice, index) in voiceList" :key="voice.name" :value="index">
            {{ voice.name }} ({{ voice.lang }})
          </option>
        </select>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  margin: auto;
  padding: 0.3rem 1.3rem 1.3rem;
  border-radius: var(--large);
  box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}

.close-btn {
  margin-left: auto;
  padding: 0 0.3rem;
  font-size: var(--large);
  border-radius: var(--x-large);
}
</style>
