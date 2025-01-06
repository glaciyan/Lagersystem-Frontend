<script setup lang="ts">
import CreateStorage from "~/components/Create/CreateStorage.vue";

const route = useRoute();

const parentId = ref(route.params.id as string);
watch(() => route.params.id, (newId) => {
  if (typeof (newId) === "string") {
    parentId.value = newId;
  }
});
</script>

<template>
  <CreateStorage
    :parentId="parentId"
    @success="async () => await $router.push(`/depot/${parentId}`)"
  />
</template>
