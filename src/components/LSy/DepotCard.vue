<template>
  <div
    class="card"
    :style="{ width: (props.maxNameLength * 10) + 'px' }"
    @click="$emit('navigate', props.id)"
  >
    <!-- Schließen-Button -->
    <span
      class="delete-icon"
      @click.stop="$emit('delete', props.id)"
    >✕</span>

    <!-- Karteninhalt -->
    <div class="card-header">
      <span
        class="card-name"
        :title="props.name"
      >{{ truncatedName }}</span>
    </div>
    <div class="card-content">
      <p
        class="card-description"
        :title="props.description"
      >
        {{ truncatedDescription }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
  name: string;
  description: string;
  id: string;
  maxNameLength: number;
  maxDescriptionLength: number;
}>();

const truncatedName = computed(() =>
  props.name.length > props.maxNameLength
    ? props.name.slice(0, props.maxNameLength)
    : props.name,
);

const truncatedDescription = computed(() => {
  const truncated = props.description.slice(0, props.maxDescriptionLength);
  return truncated.replace(/(.{20})/g, "$1\n") + (props.description.length > props.maxDescriptionLength ? "..." : "");
});
</script>

  <style scoped>
  .card {
    border: 2px solid #ccc;
    border-radius: 12px;
    padding: 20px;
    margin: 10px 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative; /* Für das X-Icon */
    transition: transform 0.3s, box-shadow 0.3s;
    background: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    margin-bottom: 10px;
  }

  .card-name {
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
  }

  .card-content {
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap; /* Zeilenumbruch */
    color: #555;
  }

  .delete-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ff5b5b;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s, transform 0.3s;
  }

  .delete-icon:hover {
    color: #ff2b2b;
    transform: scale(1.2);
  }
  </style>
