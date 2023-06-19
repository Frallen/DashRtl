<template>
  <div class="grid wrapper">
    <transition-group name="fade">
      <div class="grid-item" v-for="item in Cells" :key="item.id"
           @dragover.prevent
           @dragenter.prevent @drop="drop">
        <div class="item" v-if="item.entry" :id="item.id" draggable="true" @dragstart="startDrag">
          <div class="item-image"><img :src='`/images/${item.entry}`' v-if="item.entry"></div>
          <div class="item-count wrapper" v-if="item.count">
            {{ item.count }}
          </div>
        </div>

      </div>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
const {Cells} = storeToRefs(useMain())
const {Prepare} = useMain()
await Prepare()

const draggedElement = ref<HTMLElement>();

const startDrag = (e: Event) => {
  draggedElement.value = e.currentTarget as HTMLElement
}
const drop = (e: Event) => {
  (e.currentTarget as HTMLElement).appendChild(draggedElement.value as HTMLElement);
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns:repeat(5, minmax(105px, auto));
  grid-template-rows: repeat(5, minmax(100px, auto));

  &-item {
    border: 1px solid $border;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 100%;

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