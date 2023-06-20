import {overFlow} from "../composables/mixins";
import {CeilItems} from "../types/global.types";
import {useCookies} from '@vueuse/integrations/useCookies'

const {get, set, remove} = useCookies(['items'], {autoUpdateDependencies: true})

interface stateType {
    ModalState: boolean
    isError: boolean
    Cells: CeilItems[]
}

export const useMain = defineStore('main', {
    state: (): stateType => ({
        ModalState: false,
        isError: false,
        Cells: [],
    }),
    getters: {},
    actions: {
        async ModalChanger(state: boolean) {
            this.ModalState = state
            overFlow(state)
        },
        async Prepare() {

            let Items = get("items") as CeilItems[] ?? []

            if (Items.length<1) {
                console.log(Items)
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
                set("items", Items)
            }
            this.Cells = []
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

        },
        async ChangeCount(count: number, id: number) {
            let Items = get("items") as CeilItems[]

            set("items", Items.map(p => {
                if (p.id === id) {
                    p.count = count
                }
                return p
            }))
            this.Prepare()
        },
        async DeleteCell(id: number) {
            let Items = get("items") as CeilItems[]

            set("items", Items.filter(p => p.id !== id))
            this.ModalChanger(false)
            this.Prepare()
        }
    }

})