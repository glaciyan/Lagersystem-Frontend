export function form<T extends {}>() {
    type Errors = Record<keyof T, string | undefined>;
    type Form = {
      values: T;
      errors: Errors;
    };

    return ref<Form>({} as Form);
};
