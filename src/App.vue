<template>
  <div>
    <Error v-if="isError"></Error>
    <div class="dashboard" v-else>
      <Info class="dashboard-info"></Info>
      <div class="dashboard-body">
        <Suspense>
          <Grid></Grid>
        </Suspense>
      </div>
      <Search class="dashboard-search"></Search>
    </div>
  </div>
</template>
<script setup lang="ts">
const {isError} = storeToRefs(useMain())
</script>
<style lang="scss">
.dashboard {
  margin: 1em;
  display: grid;
  gap: 24px;
  grid-template-areas:
      "info body body"
      "info body body"
      "search search search";
  grid-template-columns: 1fr 3fr;
  height: 90vh;
  &-info {
    grid-area: info;
  }

  &-body {
    grid-area: body;
    height: 100%;
  }

  &-search {
    grid-area: search;
    height: fit-content;
  }

}
</style>
