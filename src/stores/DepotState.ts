// stores/IndexState.ts
import { defineStore } from "pinia";

export const useDepotState = defineStore("depotState", {
  state: () => ({
    showCreateStorage: false,
    updateStorages: false,
  }),
  actions: {
    toggleCreateStorage() {
      this.showCreateStorage = !this.showCreateStorage;
    },
    triggerUpdate() {
      console.log("triggerUpdate für Depots");
      this.updateStorages = !this.updateStorages;
    },
  },

});
