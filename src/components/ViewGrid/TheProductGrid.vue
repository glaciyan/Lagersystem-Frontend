<script setup lang="ts">
import { z } from "zod";
import { Product, ProductArray } from "~/api/types";
import ProductCard from "../ItemCard/ProductCard.vue";

const props = defineProps<{ data: z.infer<typeof ProductArray> | null }>();
const emit = defineEmits<{
  update: [];
  open: [selectedProduct: z.infer<typeof Product> ];
  ready: [container: HTMLDivElement | null];
}>();

const container = useTemplateRef<HTMLDivElement>("container");
const items = useTemplateRef<HTMLDivElement[]>("items");

onMounted(() => {
  emit("ready", container.value);
});
</script>

<template>
  <div
    ref="container"
    class="grid grid-cols-2 mt-6 gap-4"
  >
    <TransitionGroup>
      <ProductCard
        v-for="product of props.data"
        ref="items"
        :key="product.id"
        :product="product"
        @update="emit('update')"
        @open="emit('open', product)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-leave-active {
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
