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
    async deleteStorage(id: string) {
      try {
        const response = await fetch(`http://localhost:8080/storages/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Fehler beim Löschen: ${response.statusText}`);
        }

        // Entferne das Depot aus der lokalen Liste
        this.storages = this.storages.filter(storage => storage.id !== id);
        const result = await response.json();
        console.log(result.message); // Optional: Erfolgsmeldung in der Konsole
      }
      catch (error: any) {
        this.error = error.message || "Fehler beim Löschen des Depots.";
        console.error(this.error);
      }
    },
  },
});
