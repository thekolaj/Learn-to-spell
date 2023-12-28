import { useStorage } from '@vueuse/core'
import { shallowRef } from 'vue'

const defaultSettings = {
  speed: 0.8,
  speedPreview: 1,
  delay: true,
  voiceIndex: <number | null>null,
}

function getEnglishVoices() {
  return speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en'))
}

/** speechSynthesis takes a bit to load when you first load the app.
 * At first, .getVoices() returns an empty list,
 * so we have to add a function to update the list once it loads.
 */
export const voiceList = shallowRef(getEnglishVoices())
speechSynthesis.onvoiceschanged = () => {
  voiceList.value = getEnglishVoices()
}

export const speechSettings = useStorage('learnToSpell.speechSettings', defaultSettings)

export type VoiceList = typeof voiceList
export type SpeechSettings = typeof speechSettings
