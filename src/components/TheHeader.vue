<script setup lang="ts">
import Navigation from "~/components/TheVerticalNavigation.vue";
import LogoWithLabel from "~/assets/logo-label.svg?component";
import Container from "./PageContainer";
import { RouterLink } from "vue-router";
import NavigatingSearchBar from "./NavigatingSearchBar.vue";

</script>

<template>
  <Container
    as="header"
    class="h-28 flex justify-start lt-sm:my-4 lt-sm:h-auto lt-sm:flex-col lt-sm:items-center sm:items-center"
  >
    <div class="flex justify-between lt-sm:mb-4 sm:mr-16">
      <RouterLink to="/">
        <LogoWithLabel />
      </RouterLink>
    </div>
    <div class="w-full flex">
      <Navigation
        orientation="verical"
        class="flex-1"
      />
    </div>
    <NavigatingSearchBar />
  </Container>
</template>
