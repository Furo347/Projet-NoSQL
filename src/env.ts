import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  VITE_RAPIDAPI_KEY: z.string()
})

envSchema.parse(import.meta.env)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
