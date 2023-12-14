import { ref } from 'vue'
import { speechSettings, voiceList } from './SpeechSettings'

export const playing = ref(false)
export const playPreview = ref(true)

export function playPauseText(text: string): void {
  if (speechSynthesis.paused) {
    speechSynthesis.resume()
  } else if (speechSynthesis.speaking) {
    speechSynthesis.pause()
  } else {
    if (playPreview.value) {
      speechSynthesis.speak(createUtterance(text, speechSettings.value.speedPreview))
      playPreview.value = false
    }
    speechSynthesis.speak(
      createUtterance(text, speechSettings.value.speed, speechSettings.value.delay),
    )
  }
}

export function stopText() {
  speechSynthesis.cancel()
}

function createUtterance(text: string, speed: number, delay: boolean = false) {
  const utterance = new SpeechSynthesisUtterance()
  utterance.text = delay === true ? (utterance.text = text.replaceAll(' ', '! ')) : text
  utterance.rate = speed
  utterance.voice = voiceList.value[speechSettings.value.voiceIndex]
  utterance.onstart = () => {
    playing.value = true
  }
  utterance.onend = () => {
    playing.value = false
  }
  return utterance
}
