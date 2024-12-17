<script setup lang="ts">
import { computed } from "vue";
import CardComponent from "~/components/Show/DepotCard.vue";
import { z } from "zod";
import { Storage } from "~/lib/api/types";
import { useRouter } from "vue-router";
import { useApi } from "~/lib/api/useApi";
import { endpoints } from "~/lib/api/config/endpoints";

// Props mit den Depots
const props = defineProps<{
  depots: z.infer<typeof Storage>[];
}>();

const router = useRouter();
const emit = defineEmits(["triggerUpdate"]);
function triggerUpdate() {
  emit("triggerUpdate");
}

const depots = computed(() => props.depots);

const navigateToDepot = (id: string) => {
  router.push(`/depot/${id}`);
};

const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie dieses Depot wirklich löschen?");
  if (confirmDelete) {
    try {
      await useApi(endpoints.deleteStorage, { params: { id } });
      console.log(`Depot ${id} wurde gelöscht.`);
      triggerUpdate();
    }
    catch (error) {
      console.error("Fehler beim Löschen des Depots:", error);
    }
  }
};
</script>

<template>
  <div>
    <h2>Depots</h2>
    <div class="depot-list">
      <!-- Dynamisches Rendering der Karten -->
      <CardComponent
        v-for="depot in depots"
        :id="depot.id"
        :key="depot.id"
        :name="depot.name"
        :description="depot.description"
        :maxNameLength="10"
        :maxDescriptionLength="20"
        @navigate="navigateToDepot"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.depot-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
</style>
