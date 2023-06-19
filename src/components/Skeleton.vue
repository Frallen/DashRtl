<template>
  <div class="skeleton">
    &nbsp;
  </div>
</template>

<script setup lang="ts">
interface propsType {
  height: string,
  width: string,
  radius: string
}

const {height, width,radius} = defineProps<propsType>()
</script>

<style scoped lang="scss">
.skeleton {
  width: v-bind(width);
  height: v-bind(height);

  background-image: linear-gradient(to right, #3C3C3C 0%, #444444 51.04%, #333333 100%);
  background-size: 200% 100%;
  animation: skeleton 2s infinite linear;
  @include br(v-bind(radius));
}

@keyframes skeleton {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
</style>