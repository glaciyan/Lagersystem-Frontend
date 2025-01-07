<script setup lang="ts">
import { endpoints } from "~/lib/api/config/endpoints";
import ApiForm from "../Form/ApiForm.vue";
import { ApiError } from "~/lib/api/core";
import { useApi } from "~/lib/api/useApi";
import FormSelectableList from "../Form/FormSelectableList.vue";
import { Button, Divider, Empty, Spin } from "ant-design-vue";
import FormInputNumber from "../Form/FormInputNumber.vue";
import { z } from "zod";
import { StoredProduct } from "~/lib/api/types";

const props = defineProps<{ storageId: string }>();

const emit = defineEmits<{
  success: [data: z.infer<typeof StoredProduct>];
  fail: [errors: ApiError[]];
}>();

const { data: products, loading: productsLoading, errors: productErrors } = useApi(endpoints.getProducts, {});
const { data: storage, loading: storageLoading, errors: storageErrors } = useApi(endpoints.getStorage, { params: { id: props.storageId } });

const selectProductSize = ref(NaN);

const filteredSpaces = computed(() => Number.isNaN(selectProductSize.value) ? [] : storage.value?.spaces.filter(s => s.totalSize > s.currentSize + selectProductSize.value));
watch(filteredSpaces, (newval) => {
  console.log(newval);
});
</script>

<template>
  <ApiForm
    :endpoint="endpoints.postStoredProducts"
    :initialState="{ productId: '', spaceId: '', quantity: 1 }"
    @success="(data) => emit('success', data)"
    @failure="(errors) => {
      console.error(errors);
      emit('fail', errors);
    }"
  >
    <div class="layout-horizontal">
      <!-- Produktauswahl -->
      <div v-if="productErrors !== null">
        Failed to load products:
        <ol>
          <li
            v-for="error of productErrors"
            :key="error.type + error.context"
          >
            {{ error.type }}: {{ error.message }}
          </li>
        </ol>
      </div>
      <Spin v-else-if="productsLoading" />
      <div
        v-else
        class="layout-vertical"
      >
        <Divider orientation="left">
          Select Product
        </Divider>
        <FormSelectableList for="productId">
          <template #default="{ onSelect, selectedId }">
            <ul class="selectable-list">
              <li
                v-for="product in products"
                :key="product.id"
                :class="{ selected: selectedId === product.id }"
                @click="onSelect(product.id); selectProductSize = product.size"
              >
                <strong>{{ product.name }}</strong> - {{ product.size }}{{ product.unit }}
              </li>
            </ul>
          </template>
        </FormSelectableList>
      </div>

      <!-- Space-Auswahl -->
      <div v-if="storageErrors !== null">
        Failed to load storage:
        <ol>
          <li
            v-for="error of storageErrors"
            :key="error.type + error.context"
          >
            {{ error.type }}: {{ error.message }}
          </li>
        </ol>
      </div>
      <Spin v-if="storageLoading" />
      <div
        v-else
        class="layout-vertical"
      >
        <Divider orientation="left">
          Select Space
        </Divider>
        <FormSelectableList
          for="spaceId"
        >
          <template #default="{ onSelect, selectedId }">
            <div v-if="filteredSpaces?.length === 0">
              <Empty>
                <template #description>
                  <span
                    v-if="Number.isNaN(selectProductSize)"
                    class="text-light-5"
                  >
                    Keine Produkt ausgewählt.
                  </span>
                  <span
                    v-else
                    class="text-light-5"
                  >
                    Keine Spaces mit genügend Platz verfügbar.
                  </span>
                </template>
              </Empty>
            </div>
            <ul
              class="selectable-list"
            >
              <li
                v-for="space in filteredSpaces"
                :key="space.id"
                :t-data="selectProductSize"
                :class="{ selected: selectedId === space.id }"
                @click="onSelect(space.id)"
              >
                <strong>{{ space.name }}</strong> - Frei: {{ space.totalSize - space.currentSize }} {{ space.unit }}
              </li>
            </ul>
          </template>
        </FormSelectableList>
      </div>
    </div>

    <Divider>
      Enter Quantity:
    </Divider>
    <FormInputNumber
      for="quantity"
      placeholder="Enter quantity"
    />

    <Button
      htmlType="submit"
      type="primary"
      style="margin-top: 10px"
    >
      Assign Product
    </Button>
  </ApiForm>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* Abstand zwischen Buttons */
  margin-top: 20px;
}

button {
  margin: 10px;
}

.layout-horizontal {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}

/* Vertical Layout */
.layout-vertical {
  width: 45%;
}

/* Selectable List Styling */
.selectable-list {
  list-style: none;
  color: black;
  padding: 0;
}

.selectable-list li {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  transition: background-color 0.3s, transform 0.3s;
}

.selectable-list li:hover {
  background-color: #e6f7ff;
  transform: scale(1.02);
}

.selectable-list li.selected {
  background-color: #1890ff;
}
</style>
