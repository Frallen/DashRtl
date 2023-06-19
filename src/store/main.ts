import {overFlow} from "../composables/mixins";
import {CeilItems} from "../types/global.types";
import {useCookies} from '@vueuse/integrations/useCookies'

interface stateType {
    ModalState: boolean
    isError: boolean
    Cells: CeilItems[]
}

export const useMain = defineStore('main', {
    state: (): stateType => ({
        ModalState: false,
        isError: false,
        Cells: []
    }),
    getters: {},
    actions: {
        async ModalChanger(state: boolean) {
            this.ModalState = state
            overFlow(state)
        },
        async Prepare() {
            const {get} = useCookies(['items'], {autoUpdateDependencies: false})
            let Items = get("items") as CeilItems[] | undefined
            if (Items === undefined) {
                Items = [
                    {
                        id: 0,
                        entry: 'GreenItem.svg',
                        count: 0
                    },
                    {
                        id: 1,
                        entry: 'YellowItem.svg',
                        count: 0
                    }, {
                        id: 2,
                        entry: 'BlueItem.svg',
                        count: 0
                    }
                ]
            }
            for (let i = 0; i < 25; i++) {
                if (Items.some(p => p.id === i)) {
                    this.Cells.push({
                        id: i,
                        ...(Items.some(p => p.entry) && Items.find(p => p.id === i && p.entry)),
                        ...(Items.some(p => p.count) && Items.find(p => p.id === i && p.count))
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