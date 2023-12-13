import { useStorage } from '@vueuse/core'

const defaultSettings = {
  speed: 1,
  speedPreview: 1,
  delay: true,
  voiceIndex: 0,
}

export default useStorage('learnToSpell.speechSettings', defaultSettings)
