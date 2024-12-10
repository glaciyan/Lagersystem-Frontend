<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useIndexState } from "~/stores/IndexState.ts";
const indexStore = useIndexState();

const props = defineProps<{
  storages: { id: string; name: string; description: string; spaces: any[]; subStorages: any[] }[];
}>();

const router = useRouter();

const dataItems = computed(() => props.storages);

const navigateToDepot = (id: string) => {
  router.push(`/depot/${id}`);
};

const handleDelete = async (id: string) => {
  await indexStore.deleteStorage(id);
};

</script>
<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
    :data-source="dataItems"
    bordered
  >
    <template #renderItem="{ item }">
      <a-list-item @click="navigateToDepot(item.id)">
        <a-card style="cursor: pointer;">
          <div
            class="card-header"
          >
            <span>
              {{ item.name }}
            </span>
            <span
              class="delete-icon"
              @click.stop="handleDelete(item.id)"
            >
              ✕
            </span>
          </div>
          <div>
            {{ item.description }}
          </div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-icon {
  color: red;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
}

.delete-icon:hover {
  color: darkred;
}
</style>
