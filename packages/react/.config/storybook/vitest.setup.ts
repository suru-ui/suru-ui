import { beforeAll } from "vite-plus/test";

import { preview } from "./preview.js";

beforeAll(preview.composed.beforeAll);
