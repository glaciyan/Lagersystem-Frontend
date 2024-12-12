// stores/IndexState.ts
import { defineStore } from "pinia";

export const useDepotState = defineStore("depotState", {
  state: () => ({
    showCreateStorage: false,
    showCreateSpace: false,
    updateStorages: false,
  }),
  actions: {
    toggleCreateStorage() {
      if (this.showCreateSpace) {
        this.showCreateSpace = false;
        this.showCreateStorage = false;
      }
      this.showCreateStorage = !this.showCreateStorage;
    },
    toggleCreateSpace() {
      if (this.showCreateStorage) {
        this.showCreateStorage = false;
        this.showCreateSpace = false;
      }
      this.showCreateSpace = !this.showCreateSpace;
    },
    triggerUpdate() {
      console.log("triggerUpdate für Depots");
      this.updateStorages = !this.updateStorages;
    },
  },

});
