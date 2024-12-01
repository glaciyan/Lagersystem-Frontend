<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "~/components/TheHeader.vue";
import TheFooter from "~/components/TheFooter.vue";
import { useApi } from "./lib/api/useApi";
import { endpoints } from "./lib/api/config/endpoints";
import { match } from "./lib/api/match";
import { z } from "zod";
import { StorageArray } from "./lib/api/types";

const storages = ref<z.infer<typeof StorageArray>>();

const result = useApi(endpoints.getStorages, {});
watchEffect(() => {
  if (result.value) {
    match(result.value, {
      ok: value => storages.value = value,
      error: error => console.error("failed", toRaw(error)),
    });
  }
  else {
    console.info("loading");
  }
});
</script>

<template>
  <div>
    <p
      v-for="storage in storages"
      :key="storage.id"
    >
      {{ storage.name }} - {{ storage.id }}
    </p>
  </div>
  <TheHeader />
  <main class="min-h-screen">
    <RouterView />
  </main>
  <TheFooter />
</template>

<style>
/* @import url(./assets/fonts/OpenSans.css); */
</style>
