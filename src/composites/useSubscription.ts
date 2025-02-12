import { emitter, Events } from "~/eventBus";

export const useSubscription = (event: keyof Events, on: () => void) => {
  onMounted(() => {
    emitter.on(event, on);
  });

  onUnmounted(() => {
    emitter.off(event);
  });
};
