<template>
  <div class="grid wrapper">
    <div class="grid-item" v-for="item in Cells" :key="item.id"></div>
  </div>
</template>
<script setup lang="ts">
const {Cells} = storeToRefs(useMain())
const {Prepare} = useMain()
await Prepare()

</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns:repeat(5, minmax(105px, auto));
  grid-template-rows: repeat(5, minmax(100px, auto));

  &-item {
    border: 1px solid $border;
  }
}
</style>