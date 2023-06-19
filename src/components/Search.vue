<template>
  <div class="search wrapper">
    <div class="search-input">
      <Skeleton :width="'100%'" :height="'36px'" :radius="'12px'"></Skeleton>
    </div>
    <div class="icon" @click.stop>
      <img src="/images/close.svg">
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.search {
  padding: 18px;
  display: flex;
  justify-content: space-between;

  &-input {
    width: 95%;
  }

  .icon {
    width: 3%;
  }
}
</style>