import {overFlow} from "../composables/mixins";

interface stateType {
    ModalState: boolean
    isError: boolean
}

export const useMain = defineStore('main', {
    state: (): stateType => ({
        ModalState: false,
        isError: false,
    }),
    getters: {},
    actions: {
        async ModalChanger(state: boolean) {
            this.ModalState = state
            overFlow(state)
        }
    }

})