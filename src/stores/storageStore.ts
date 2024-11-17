// stores/storageStore.ts
import { defineStore } from "pinia";

export const useStorageStore = defineStore("storage", {
  state: () => ({
    storages: [] as Array<{ id: string; name: string; description: string }>, // Liste der Storages
    error: null as string | null, // Fehlernachricht
    isLoading: false, // Ladezustand
  }),
  actions: {
    async fetchStorages() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch("http://localhost:8080/storages", {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error(`Fehler beim Abrufen: ${response.statusText}`);
        }

        const result = await response.json();
        this.storages = result.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
        }));
      }
      catch (error: any) {
        this.error = error.message || "Fehler beim Abrufen der Daten.";
      }
      finally {
        this.isLoading = false;
      }
    },

    async refreshStorages() {
      await this.fetchStorages();
    },
  },
});
