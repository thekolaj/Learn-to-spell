import { ref } from 'vue'
import { speechSettings, voiceList } from './speechSettings'

export const playing = ref(false)

export function playTextWithPreview(text: string): void {
  speechSynthesis.speak(createUtterance(text, speechSettings.value.speedPreview))
  speechSynthesis.speak(
    createUtterance(text, speechSettings.value.speed, speechSettings.value.delay),
  )
}

export function playPauseText(text: string): void {
  if (speechSynthesis.paused) {
    playing.value = true
    speechSynthesis.resume()
  } else if (speechSynthesis.speaking) {
    playing.value = false
    speechSynthesis.pause()
  } else {
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
    if (!speechSynthesis.pending) playing.value = false
  }
  return utterance
}
