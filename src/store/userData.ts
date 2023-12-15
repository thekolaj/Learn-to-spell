import { useStorage } from '@vueuse/core'
import type { UserData } from '@/components/userDataUtils'

const userDataStore = useStorage('learnToSpell.userData', <UserData>{})

export default userDataStore.value
