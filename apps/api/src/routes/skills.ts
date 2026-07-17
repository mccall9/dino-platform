import { Elysia } from "elysia"
import {
  SKILLS_CATALOG,
  SKILLS_CATALOG_NOTE,
  type SkillsListResponse,
} from "@dino/shared"

export const skillsRoutes = new Elysia({ prefix: "/skills" }).get(
  "/",
  (): SkillsListResponse => ({
    note: SKILLS_CATALOG_NOTE,
    skills: SKILLS_CATALOG,
  }),
  {
    detail: {
      summary: "List installable skills catalog (with links + descriptions)",
    },
  },
)
