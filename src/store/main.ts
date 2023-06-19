import {overFlow} from "../composables/mixins";
import {CeilItem} from "../types/global.types";
import {useCookies} from '@vueuse/integrations/useCookies'

interface stateType {
    ModalState: boolean
    isError: boolean
    Cells: CeilItem[]
}

export const useMain = defineStore('main', {
    state: (): stateType => ({
        ModalState: false,
        isError: false,
        Cells: [{id: 0}]
    }),
    getters: {},
    actions: {
        async ModalChanger(state: boolean) {
            this.ModalState = state
            overFlow(state)
        },
        async Prepare() {
            const {get} = useCookies(['items'], {autoUpdateDependencies: false})
            const item = get("items") as CeilItem[] | undefined
            console.log(item)
            for (let i = 1; i < 25; i++) {
                if (item && item.some(p => p.id === i)) {
                    this.Cells.push({
                        id: i,
                        ...(item.find(p => p.entry) && item.find(p => p.entry)),
                        ...(item.find(p => p.count) && item.find(p => p.count))
                    })
                } else {
                    this.Cells.push({
                        id: i,
                    })
                }

            }

        }
    }

})