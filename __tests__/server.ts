import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

export const bootstrap = async (): Promise<INestApplication | never> => {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  })
  if (!app) throw new Error(`Couldn't start server`)
  await app.listen(3000)
  return app
}

export const teardown = async (app: INestApplication): Promise<void> => {
  try {
    await app.close()
  } catch (e) {
    Logger.error('Error', e, teardown.name)
  }
}
