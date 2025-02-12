<script setup lang="ts" generic="T extends {}">
type Errors = Record<keyof T, { message: string; type: string }>;
const model = defineModel<{ values: T; errors: Errors }>();

const props = defineProps<{
  initialValues: T;
  validation?: (values: T, errors: Errors) => any;
}>();

const emit = defineEmits<{
  submit: [payload: T];
}>();

const errors = ref<Errors>({} as Errors);

const { cloned: values } = useCloned(props.initialValues, { manual: true });

const form = computed(() => ({
  values: values.value,
  errors: errors.value,
  validate: props.validation,
}));

model.value = form.value;

const validationHandler = () => {
  if (props.validation) {
    // const errors: any = {};
    Object.keys(props.initialValues).forEach(k => errors.value[k] = "");
    props.validation(values.value, errors.value);
    for (const obj of Object.values(errors.value)) {
      if (obj) {
        // do not emit submit when there are errors present
        return;
      }
    }
  }
  emit("submit", toRaw(values.value));
};

provide("values", values);
provide("form", form);
provide("submit", validationHandler);
</script>

<template>
  <slot />
</template>
