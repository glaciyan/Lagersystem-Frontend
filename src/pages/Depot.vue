<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const depotId = ref(route.params.id); // Hol die ID aus der Route

</script>

<template>
  <div>
    <h1>Depot Details</h1>
    <p>Depot ID: {{ depotId }}</p>
  </div>
</template>
