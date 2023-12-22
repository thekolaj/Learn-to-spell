import { useStorage } from '@vueuse/core'
import { shallowRef } from 'vue'

const defaultSettings = {
  speed: 0.8,
  speedPreview: 1,
  delay: true,
  voiceIndex: <number | null>null,
}

/** speechSynthesis takes a bit to load when you first load the app.
 * At first, .getVoices() returns an empty list,
 * so we have to add a function to update the list once it loads.
 */
export const voiceList = shallowRef(speechSynthesis.getVoices())
speechSynthesis.onvoiceschanged = () => {
  voiceList.value = speechSynthesis.getVoices()
}

export const speechSettings = useStorage('learnToSpell.speechSettings', defaultSettings)

export type VoiceList = typeof voiceList
export type SpeechSettings = typeof speechSettings
