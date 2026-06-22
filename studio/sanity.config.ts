import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Matikyan Dental Clinic",
  projectId: "zfth7el3",
  dataset: "production",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
