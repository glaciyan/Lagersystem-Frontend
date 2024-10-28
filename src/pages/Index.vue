<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import GButton from "~/components/GButton/GButton.vue";
</script>

<template>
  <PageContainer>
    <GButton
      label="hello"
    />
    <GButton
      label="Hello Loading"
      loadingPosition="left"
    />
  </PageContainer>
</template>
