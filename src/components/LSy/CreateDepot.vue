<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import DividerHo from "~/components/LSy/DividerHo.vue";

const props = defineProps<{
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
const closeDepot = () => {
  emit("close");
};

const placeholderValue = props.placeholder || "Geben Sie etwas ein";

const inputValue = ref<string>("");
const isLoading = ref<boolean>(false);
const handleSubmit = async () => {
  if (!inputValue.value) {
    alert("Bitte geben Sie einen Namen ein.");
    return;
  }

  isLoading.value = true;
  try {
    const response = await fetch("http://localhost:8080/storages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValue.value,
        description: "Default Description",
        parentId: null,
      }),
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Erstellen: ${response.statusText}`);
    }

    const result = await response.json();

    console.log("Erfolgreich erstellt:", result);
    alert("Storage erfolgreich erstellt!");
    inputValue.value = "";
    closeDepot();
  }
  catch (error: any) {
    console.error("Fehler beim Erstellen des Storages:", error);
    alert("Fehler beim Erstellen des Storages.");
  }
  finally {
    isLoading.value = false; // Ladezustand deaktivieren
  }
};

</script>

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
