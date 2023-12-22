import { computed, type Ref } from 'vue'
import router from '@/router'
import type { SpeechControls } from '../speech/useSpeechControls'
import type { ExerciseState } from '../createExerciseState'
import { submitAnswer } from '../dataControls/dataControls'

export default function useExerciseControls(
  speech: SpeechControls,
  state: Ref<ExerciseState>,
  textAreaElement: Ref<HTMLInputElement | null>,
) {
  return {
    playPauseButtonText: computed(() => {
      return speech.playing ? 'Pause' : 'Play'
    }),

    submitButtonText: computed(() => {
      if (state.value.isExerciseCompleted) return 'Finish'
      if (state.value.isAnswerSubmitted) return 'Next'
      if (state.value.isNewSentence) return 'Start'
      return 'Submit'
    }),

    completionText: computed(() => {
      return `${state.value.exerciseUserData.done.length}/${state.value.exerciseData.length}`
    }),

    playPauseButton() {
      if (state.value.isAnswerSubmitted) return
      if (state.value.isNewSentence) {
        speech.playTextWithPreview(state.value.exerciseData[state.value.exerciseUserData.current])
        state.value.isNewSentence = false
      } else {
        speech.playPauseText(state.value.exerciseData[state.value.exerciseUserData.current])
      }
      textAreaElement.value?.focus()
    },

    submitButton() {
      if (state.value.isExerciseCompleted) {
        router.push({ name: 'completed', params: { exercise: state.value.exerciseName } })
      }
      if (state.value.isAnswerSubmitted) state.value.resetSentence()
      else if (state.value.isNewSentence) this.playPauseButton()
      else {
        speech.stopText()
        submitAnswer(state.value)
      }
    },

    homeButton() {
      speech.stopText()
      router.push({ name: 'home' })
    },
  }
}

export type ExerciseControls = ReturnType<typeof useExerciseControls>
