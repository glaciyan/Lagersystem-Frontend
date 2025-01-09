<script setup lang="ts">
import CreateProduct from "~/components/Create/CreateProduct.vue";
</script>

<template>
  <CreateProduct
    @success="async () => {
      if ($route.query.origin) {
        return $router.push(`/storage/${$route.query.origin}`);
      } else {
        return $router.push('/');
      }
    }"
  />
</template>
