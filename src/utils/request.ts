import { createAxiosByInterceptors } from "./axios";
import { BASE_URL } from "@/config/http";

const request = createAxiosByInterceptors({
  baseURL: BASE_URL,
});

export default request;
