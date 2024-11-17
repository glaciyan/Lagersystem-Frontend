<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

// Prop: Array von Depots
const props = defineProps<{
  depots: { id: string; name: string }[]; // Array von Depot-Objekten
}>();

// Router verwenden
const router = useRouter();

// Computed-Wert für die Liste
const dataItems = computed(() => props.depots);

// Navigiere zur Depot-Seite
const navigateToDepot = (id: string) => {
  router.push(`/depot/${id}`); // Navigiere mit der ID
};
</script>

<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
    :data-source="dataItems"
    bordered
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card
          :title="item.name"
          style="cursor: pointer;"
          @click="navigateToDepot(item.id)"
        >
          Card content
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>
