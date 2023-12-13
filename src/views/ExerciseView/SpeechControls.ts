import { ref } from 'vue'

export const voiceList = speechSynthesis.getVoices()

export const playing = ref(false)

export function playPauseText(
  text: string,
  speed: number,
  voice: number,
  delay: boolean = false,
): void {
  if (speechSynthesis.paused) {
    speechSynthesis.resume()
  } else if (speechSynthesis.speaking) {
    speechSynthesis.pause()
  } else {
    speechSynthesis.speak(createUtterance(text, speed, voice, delay))
  }
}

export function stopText() {
  speechSynthesis.cancel()
}

function createUtterance(text: string, speed: number, voice: number, delay: boolean) {
  const utterance = new SpeechSynthesisUtterance()
  utterance.text = delay === true ? (utterance.text = text.replaceAll(' ', '! ')) : text
  utterance.rate = speed
  utterance.voice = voiceList[voice]
  utterance.onstart = () => {
    playing.value = true
  }
  utterance.onend = () => {
    playing.value = false
  }
  return utterance
}
