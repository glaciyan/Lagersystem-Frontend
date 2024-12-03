<script setup lang="ts">
import GButton from "~/components/Button/BaseButton.vue";
import PageContainer from "~/components/PageContainer";
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
