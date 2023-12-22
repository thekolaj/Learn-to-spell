import { reactive } from 'vue'
import type { SpeechSettings, VoiceList } from './speechSettings'

export default function useSpeechControls(speechSettings: SpeechSettings, voiceList: VoiceList) {
  return reactive({
    /** Track playback status in a reactive variable */
    playing: false,

    /** First time when starting a new sentence, play text twice. */
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

    /** Passed to speechSynthesis.speak() to begin playback */
    createUtterance(text: string, speed: number, delay: boolean = false) {
      const utterance = new SpeechSynthesisUtterance()
      utterance.text = delay === true ? (utterance.text = text.replaceAll(' ', '! ')) : text
      utterance.rate = speed
      if (speechSettings.value.voiceIndex) {
        utterance.voice = voiceList.value[speechSettings.value.voiceIndex]
      }
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

export type SpeechControls = ReturnType<typeof useSpeechControls>
