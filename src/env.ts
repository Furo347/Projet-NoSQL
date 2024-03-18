import { z } from "zod";

const clientEnvSchema = z.object({})

const envSchema = clientEnvSchema.extend({
  NODE_ENV: z.string().default('development'),
  RAPIDAPI_KEY: z.string(),
  MONGO_HOST: z.string(),
  MONGO_PORT: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
})

envSchema.parse(process.env)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }

  interface ImportMetaEnv extends z.infer<typeof clientEnvSchema> {}
}
