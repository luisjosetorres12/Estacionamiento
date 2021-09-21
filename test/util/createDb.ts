import { createConnection, EntitySchema } from 'typeorm'
type Entity = Function | string | EntitySchema<any>

export async function createDb(entities: Entity[]) {
    return createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities,
      dropSchema: true,
      synchronize: true,
      logging: false
    })
  }