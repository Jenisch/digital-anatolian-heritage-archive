import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourceDirectory = path.join(projectRoot, "node_modules", "maplibre-gl", "dist");
const targetDirectory = path.join(projectRoot, "public", "maplibre");

await mkdir(targetDirectory, { recursive: true });

await Promise.all([
  copyFile(
    path.join(sourceDirectory, "maplibre-gl-worker.mjs"),
    path.join(targetDirectory, "maplibre-gl-worker.mjs"),
  ),
  copyFile(
    path.join(sourceDirectory, "maplibre-gl-shared.mjs"),
    path.join(targetDirectory, "maplibre-gl-shared.mjs"),
  ),
]);
