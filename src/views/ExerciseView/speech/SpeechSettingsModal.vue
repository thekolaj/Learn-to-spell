<script setup lang="ts">
import { ref } from 'vue'
import vFocus from '@/components/utils'
import { speechSettings, voiceList } from './speechSettings'

const isModalVisible = ref(false)
const isMobileBrowser = /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i.test(navigator.userAgent)

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
        <div>
          <label for="preview-speed">Preview Speech Speed:</label>
          <input
            type="number"
            id="preview-speed"
            min=".1"
            max="3"
            step=".1"
            v-model="speechSettings.speedPreview"
          />
        </div>
        <div>
          <label for="speed">Regular Speech Speed:</label>
          <input
            type="number"
            id="speed"
            min=".1"
            max="3"
            step=".1"
            v-model="speechSettings.speed"
            v-focus
          />
        </div>
        <div>
          <label for="delay">Add delay between words:</label>
          <input type="checkbox" id="delay" v-model="speechSettings.delay" />
        </div>
        <div v-if="!isMobileBrowser">
          <label for="voices">Select a voice:</label>
          <select id="voices" v-model="speechSettings.voiceIndex">
            <option :value="null">Default</option>
            <option v-for="(voice, index) in voiceList" :key="voice.name" :value="index">
              {{ voice.name }} ({{ voice.lang }})
            </option>
          </select>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
input {
  font-size: var(--large);
}

input[type='number'] {
  margin-left: 0.5rem;
  width: 5rem;
}

input[type='checkbox'] {
  margin-left: 2.2rem;
  width: var(--large);
  height: var(--large);
  box-shadow: 0 0 0 2px var(--primary-good);
}

select {
  font-size: 0.8rem;
  display: block;
}

.modal-container > div {
  margin-top: 0.8rem;
  text-align: center;
}

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
  align-items: center;
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
