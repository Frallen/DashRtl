<template>
  <div>
    <Error v-if="isError"></Error>
    <div v-else>
      <div>
        <Modal :isShow="true" @closeModal="ModalChanger"></Modal>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const {isError, ModalState} = storeToRefs(useMain())
const {ModalChanger} = useMain()

</script>
<style lang="less">

</style>
