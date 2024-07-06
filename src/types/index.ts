export type APIResponse = {
  status: "success" | "error";
  data?: any;
  error?: Error;
};
