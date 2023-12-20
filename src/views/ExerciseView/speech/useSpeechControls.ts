import { reactive } from 'vue'
import type { SpeechSettings, VoiceList } from './speechSettings'

function useSpeechControls(speechSettings: SpeechSettings, voiceList: VoiceList) {
  return reactive({
    playing: false,

    playTextWithPreview(text: string): void {
      speechSynthesis.speak(this.createUtterance(text, speechSettings.value.speedPreview))
      speechSynthesis.speak(
        this.createUtterance(text, speechSettings.value.speed, speechSettings.value.delay),
      )
    },

    playPauseText(text: string): void {
      if (speechSynthesis.paused) {
        this.playing = true
        speechSynthesis.resume()
      } else if (speechSynthesis.speaking) {
        this.playing = false
        speechSynthesis.pause()
      } else {
        speechSynthesis.speak(
          this.createUtterance(text, speechSettings.value.speed, speechSettings.value.delay),
        )
      }
    },

    stopText() {
      speechSynthesis.cancel()
    },

    createUtterance(text: string, speed: number, delay: boolean = false) {
      const utterance = new SpeechSynthesisUtterance()
      utterance.text = delay === true ? (utterance.text = text.replaceAll(' ', '! ')) : text
      utterance.rate = speed
      utterance.voice = voiceList.value[speechSettings.value.voiceIndex]
      utterance.onstart = () => {
        this.playing = true
      }
      utterance.onend = () => {
        if (!speechSynthesis.pending) this.playing = false
      }
      return utterance
    },
  })
}

export default useSpeechControls
export type SpeechControls = ReturnType<typeof useSpeechControls>
