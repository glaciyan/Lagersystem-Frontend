// stores/IndexState.ts
import { defineStore } from "pinia";

export const useIndexState = defineStore("indexState", {
  state: () => ({
    showCreateDepot: false,
    updateDepots: false,
  }),
  actions: {
    toggleCreateDepot() {
      this.showCreateDepot = !this.showCreateDepot;
    },
    triggerUpdate() {
      console.log("triggerUpdate für Depots");
      this.updateDepots = !this.updateDepots;
    },
  },

});
