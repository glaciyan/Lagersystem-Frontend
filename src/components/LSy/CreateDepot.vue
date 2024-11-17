<template>
  <div class="form-container">
    <DividerHo />
    <div class="header">
      <!-- Schließen-Button -->
      <a-button
        type="text"
        class="close-button"
        @click="closeDepot"
      >
        ✕
      </a-button>
    </div>
    <a-input-group compact>
      <a-input
        v-model:value="inputValue"
        :placeholder="placeholderValue"
        style="width: calc(100% - 100px)"
      />
      <a-button
        type="primary"
        :disabled="isLoading"
        @click="handleSubmit"
      >
        >
        {{ isLoading ? "Loading..." : "Submit" }}
      </a-button>
    </a-input-group>
    <DividerHo />
  </div>
</template>

<script lang="ts" setup>
// Props deklarieren
import { ref, defineProps, defineEmits } from "vue";
import DividerHo from "~/components/LSy/DividerHo.vue";

// Props: Übergabe des Platzhalters
const props = defineProps<{
  placeholder: string; // Platzhalter-Prop für das Eingabefeld
}>();

const emit = defineEmits<{
  (e: "close"): void; // Definiert das Event "close"
}>();

// Standardwert für den Platzhalter verwenden, falls kein Wert übergeben wird
const placeholderValue = props.placeholder || "Geben Sie etwas ein";

// Eingabewert und Ladezustand
const inputValue = ref<string>("");
const isLoading = ref<boolean>(false); // Ladezustand

// Funktion für den Submit-Button
const handleSubmit = async () => {
  if (!inputValue.value) {
    alert("Bitte geben Sie einen Namen ein.");
    return;
  }

  isLoading.value = true; // Ladezustand aktivieren
  try {
    const response = await fetch("http://localhost:8080/storages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValue.value,
        description: "Default Description", // Beispiel für zusätzliche Felder
        parentId: null, // Beispiel für ParentID
      }),
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Erstellen: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Erfolgreich erstellt:", result);
    alert("Storage erfolgreich erstellt!");
    inputValue.value = ""; // Eingabe zurücksetzen
  }
  catch (error: any) {
    console.error("Fehler beim Erstellen des Storages:", error);
    alert("Fehler beim Erstellen des Storages.");
  }
  finally {
    isLoading.value = false; // Ladezustand deaktivieren
  }
};

// Funktion für den Schließen-Button
const closeDepot = () => {
  emit("close"); // Event auslösen, um den Bereich zu schließen
};
</script>

<style scoped>
.form-container {
  max-width: 400px; /* Optional: Begrenze die Breite */
  margin: 0 auto; /* Zentriere das Formular */
  padding: 20px;
  position: relative;
}

.header {
  display: flex;
  justify-content: flex-end; /* Rechtsbündig */
  margin-bottom: 8px;
}

.close-button {
  font-size: 16px;
  color: #ff4d4f;
  cursor: pointer;
}
</style>
