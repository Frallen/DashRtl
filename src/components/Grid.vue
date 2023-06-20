<template>
  <div class="grid wrapper">
    <transition-group name="fade">
      <div class="grid-item" v-for="item in Cells" :key="item.id"
           @dragover.prevent
           @dragenter.prevent @drop="drop($event, item.id)">
        <div class="item" :id="item.id" :data-entry="item.entry" :data-count="item.count" v-if="item.entry"
             draggable="true" @dragstart="startDrag" @click="openModal(item)">
          <div class="item-image"><img :src='`/images/${item.entry}`' v-if="item.entry"></div>
          <div class="item-count wrapper" v-if="item.count">
            {{ item.count }}
          </div>
        </div>

      </div>
    </transition-group>
    <Modal :isShow="ModalState" @closeModal="ModalChanger">
      <div class="modal-body-image"><img :src="`/images/${ActiveCell?.entry}`" alt=""></div>
      <div class="modal-body-text">
        <Skeleton class="title" :width="'100%'" :height="'30px'" :radius="'8px'"></Skeleton>
        <Skeleton class="text" :width="'100%'" :height="'10px'" :radius="'4px'"></Skeleton>
        <Skeleton class="text" :width="'100%'" :height="'10px'" :radius="'4px'"></Skeleton>
        <Skeleton class="text" :width="'100%'" :height="'10px'" :radius="'4px'"></Skeleton>
        <Skeleton class="text" :width="'80%'" :height="'10px'" :radius="'4px'"></Skeleton>
        <Skeleton class="text" :width="'20%'" :height="'10px'" :radius="'4px'"></Skeleton>
      </div>
      <div class="modal-body-actions">
        <button class="button button-primary" v-show="!buttonsState" @click.stop="DeleteCell(ActiveCell?.id as number)">
          Удалить предмет
        </button>
        <button class="button button-secondary" v-show="!buttonsState" @click.stop="buttonsState=true">Ввести
          количество
        </button>
        <transition name="fade">
          <div class="count" v-show="buttonsState">
            <input type="number" placeholder="Введите количество" class="input" v-model.trim.number="inputCount">
            <div class="buttons">
              <button class="button button-secondary" @click.stop="buttonsState=false">Отмена</button>
              <button class="button button-primary"
                      @click.stop="inputCount&&ChangeCount(inputCount,ActiveCell?.id as number)">Подтвердить
              </button>
            </div>
          </div>
        </transition>
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import {useCookies} from "@vueuse/integrations/useCookies";
import {CeilItems} from "../types/global.types";

let {Cells, ModalState} = storeToRefs(useMain())
const {Prepare, ModalChanger, ChangeCount, DeleteCell} = useMain()
await Prepare()
const buttonsState = ref<boolean>(false)
let inputCount = ref<number>()

let ActiveCell = ref<CeilItems>()


const {get, set} = useCookies(['items'], {autoUpdateDependencies: true})
const draggedElement = ref<HTMLElement>();

const startDrag = (e: Event) => {
  draggedElement.value = e.currentTarget as HTMLElement
}
const openModal = (item: CeilItems) => {
  ModalChanger(true)
  ActiveCell.value = item
}

const drop = async (e: Event, dropZoneId: number) => {
  const htmlElement = (e.currentTarget as HTMLElement)

  if (htmlElement.children.length < 1) {
    htmlElement.appendChild(draggedElement.value as HTMLElement);
    const items = get("items") as CeilItems[]

    set("items", items.map(p => {

      if (draggedElement.value && p.id === parseInt(draggedElement.value.id)) {
        p.id = dropZoneId
        p.entry = draggedElement.value.dataset.entry
        p.count = parseInt(draggedElement.value.dataset.count as string)
        draggedElement.value.id = dropZoneId.toString()
      }
      return p
    }))
    await Prepare()
  }
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns:repeat(5, minmax(105px, auto));
  grid-template-rows: repeat(5, minmax(100px, auto));
  position: relative;
  height: 100%;
  overflow: hidden;

  &-item {
    border: 1px solid $border;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 100%;
      cursor: pointer;

      &-image {
        height: 54px;
        width: 54px;
      }

      &-count {
        position: absolute;
        right: 0;
        bottom: 0;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        padding: 2px 4px;
        align-self: flex-end;
        @include br(6px 0 0 0);
        color: #ffffffcf;
      }
    }
  }
}

</style>