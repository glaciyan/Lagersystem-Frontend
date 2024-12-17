<script setup lang="ts">
import { App, ConfigProvider, StyleProvider, theme } from "ant-design-vue";
import { RouterView } from "vue-router";
import TheFooter from "~/components/TheFooter.vue";
import TheHeader from "~/components/TheHeader.vue";
</script>

<template>
  <StyleProvider hashPriority="high">
    <ConfigProvider
      :theme="{
        algorithm: theme.darkAlgorithm,
        token: {
          fontSize: 15,
          colorPrimary: '#02b1e7',
          colorInfo: '#37c7fe',
        }
      }"
    >
      <App>
        <TheHeader />
        <main class="min-h-screen">
          <RouterView />
        </main>
        <TheFooter />
      </App>
    </ConfigProvider>
  </StyleProvider>
</template>
