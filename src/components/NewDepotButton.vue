<script setup lang="ts">
import { Button } from "ant-design-vue";
import { RouterLink } from "vue-router";
import AddIcon from "~/icons/AddIcon.vue";

</script>

<template>
  <RouterLink to="/depot/create">
    <Button
      type="primary"
    >
      <div class="align-center flex gap-2">
        <AddIcon />
        Depot Erstellen
      </div>
    </Button>
  </RouterLink>
</template>
