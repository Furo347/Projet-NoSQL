import { Hono } from "hono";
import points from "./points.ts";
import check from "./check.ts";

const api = new Hono()

const routes = api
    .route('/', points)
    .route('/', check)

export type APIType = typeof routes;
export default api;
