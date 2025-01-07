<script setup lang="ts">
import { inject } from "vue";

const props = defineProps<{ for: string }>(); // Schlüssel muss definiert sein
const values = inject("values") as Ref<Record<string, any>>;

function selectItem(id: string) {
  values.value[props.for] = id; // Korrekte Zuordnung des Schlüssels im Formular
}
</script>

<template>
  <div>
    <slot :onSelect="selectItem" :selectedId="values[props.for]" />
  </div>
</template>
