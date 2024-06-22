import { AppType } from "@/server";
import { hc } from "hono/client";

const client = hc<AppType>("/");
export const api = client.api;
