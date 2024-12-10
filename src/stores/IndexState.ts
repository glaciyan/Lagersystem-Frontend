// stores/IndexState.ts
import { defineStore } from "pinia";
import { useApi } from "~/lib/api/useApi";
import { endpoints } from "~/lib/api/config/endpoints";

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
    async deleteStorage(id: string) {
      try {
        const response = await useApi(endpoints.deleteStorage, {
          params: {
            id,
          },
        });
        console.log("Storage wurde gelöscht:", response);
        // Trigger update nach dem Löschen
        // this.triggerUpdate();
      }
      catch (error) {
        console.error("Fehler beim Löschen des Depots:", error);
      }
    },
  },
});
