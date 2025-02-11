import { match } from "~/lib/api/match";
import { notification } from "ant-design-vue";
import { ApiError } from "~/lib/api/core";

export const postAndForget = async (config: {
  apiCall: () => Promise<any>;
  onSuccess: () => void;
  onError?: (errors: ApiError[]) => void;
  successMessage: string;
  errorMessage: (errors: ApiError[]) => string;
}) => {
  const result = await config.apiCall();
  match(result, {
    ok: () => {
      notification.success({
        message: "Erfolg",
        description: config.successMessage,
        duration: 3,
      });

      config.onSuccess();
    },
    error: (errors) => {
      notification.error({
        message: "Fehler",
        description: config.errorMessage(errors),
        duration: 7,
      });

      if (config.onError) {
        config.onError(errors);
      }
    },
  });
};
