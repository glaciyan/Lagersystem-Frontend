<script setup lang="ts">
import Navigation from "~/components/TheVerticalNavigation.vue";
import LogoWithLabel from "~/assets/logo-label.svg?component";
import Container from "./PageContainer";
import { RouterLink } from "vue-router";
</script>

<template>
  <Container as="header" class="flex h-28 justify-start sm:items-center lt-sm:items-center lt-sm:flex-col lt-sm:h-auto lt-sm:my-4">
    <div class="flex justify-between sm:mr-16 lt-sm:mb-4">
      <RouterLink to="/">
        <LogoWithLabel />
      </RouterLink>
    </div>
    <div class="flex w-full">
      <Navigation orientation="verical" class="flex-1" />
    </div>
  </Container>
</template>
