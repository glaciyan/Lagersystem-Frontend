import { createErrors } from "./errorUtil";

export const Errors = createErrors({
  FE_API_REQUEST_ABORT: {
    message: "Request was aborted cannot read result",
  },
  FE_API_REQUEST_TYPE_ERROR: {
    message: "There was an error decoding the body content.",
  },
  FE_API_REQUEST_SYNTAX_ERROR: {
    message: "The response body cannot be parsed as JSON.",
  },
  FR_API_UNKNOWN: {
    message: "An unexpected error has occured please check the console logs",
  },
  FR_API_INVALID_FORMAT: {
    message: "The format returned by the API is in an unexpected format.",
  },
  FR_API_FETCH_ENVIRONMENT_INVALID: {
    message: "The environment is unable to use the API",
  },
  FR_API_FETCH_FAILED: {
    message: "Unable to get a connection to the API",
  },
});
