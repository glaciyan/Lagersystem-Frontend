<script setup lang="ts">
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";

const props = defineProps<{ id: string }>();

const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorage, { params: { id: props.id } });
</script>

<template>
</template>
