<script setup lang="ts">
const { x, y } = useMouse();
const el = ref<HTMLElement | null>(null);
</script>

<template>
  <div
    ref="el"
    class="rounded-xl p-[3px] relative bg-dark-800 card"
    :style="{
      '--x': `${x - (el?.offsetLeft ?? 0)}px`,
      '--y': `${y - (el?.offsetTop ?? 0)}px`
    }"
  >
    <div class="p-4 h-full w-full rounded-xl relative bg-dark-600 ring-[#15ca82] shadow-md transition-shadow hover:ring">
      <h1 class="text-xl font-bold tracking-wider mb-2">
        Hello Testing
      </h1>
      <p>This is my testing text and something more to just fill this box of content.</p>
    </div>
  </div>
</template>

<style scoped>
.card::before {
  @apply rounded-xl;
  content: '';
  position: absolute;
  inset: 0px;
  background: radial-gradient(
    200px circle at var(--x) var(--y),
    #15ca82,
    transparent
  );
}
</style>