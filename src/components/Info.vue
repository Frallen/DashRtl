<template>
  <div class="info wrapper">
    <div class="info-image"><img src="/images/BlurImg.png" alt=""></div>
    <div class="info-title">
      <Skeleton class="p" :width="'190px'" :height="'26px'" :radius="'8px'"></Skeleton>
    </div>
    <Skeleton class="p" :width="'155px'" :height="'10px'" :radius="'4px'"></Skeleton>
    <Skeleton class="p" :width="'155px'" :height="'10px'" :radius="'4px'"></Skeleton>
    <Skeleton class="p" :width="'155px'" :height="'10px'" :radius="'4px'"></Skeleton>
    <Skeleton class="a" :width="'80px'" :height="'10px'" :radius="'4px'"></Skeleton>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.info {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 18px 14px;
.p{
  margin: 1em 0;
}
  .a{
    justify-self: flex-end;
  }
  &-image {
    width: 200px;
    height: 240px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &-title {
    margin: 20px 0 0
  }
}
</style>