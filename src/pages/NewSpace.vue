<script setup lang="ts">
import CreateSpace from "~/components/Create/CreateSpace.vue";

const route = useRoute();

const parentId = ref(route.params.id as string);
watch(() => route.params.id, (newId) => {
  if (typeof (newId) === "string") {
    parentId.value = newId;
  }
});
</script>

<template>
  <CreateSpace
    :storageId="parentId"
    @success="async () => await $router.push(`/storage/${parentId}`)"
  />
</template>
