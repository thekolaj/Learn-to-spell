import { useStorage } from '@vueuse/core'
import { shallowRef } from 'vue'

const defaultSettings = {
  speed: 1,
  speedPreview: 1,
  delay: true,
  voiceIndex: 0,
}

export const voiceList = shallowRef(speechSynthesis.getVoices())
speechSynthesis.onvoiceschanged = () => {
  voiceList.value = speechSynthesis.getVoices()
}

export const speechSettings = useStorage('learnToSpell.speechSettings', defaultSettings)
