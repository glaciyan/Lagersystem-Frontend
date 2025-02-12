export function form<T extends {}>() {
    type Errors = Record<keyof T, {
      message: string;
      type: string;
    }>;
    type Form = {
      values: T;
      errors: Errors;
    };

    return ref<Form>({} as Form);
};
