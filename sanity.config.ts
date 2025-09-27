import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { defaultDocumentNode, deskStructure } from "./sanity/deskStructure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "TODO_PROJECT_ID";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Renjoin Temple",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
