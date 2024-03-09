import { getConfiguration } from '@configuration';
import { getDataSource } from './database.source';
import { Migration } from 'typeorm'
const commandLineArgs = require('command-line-args')

const dataSourceAsync = async () => {
  const config = getConfiguration()
  const dataSource = getDataSource(config.database)
  return dataSource
}

const runMigrations = async () => {
  const dataSource = await dataSourceAsync()
  await dataSource.initialize()
  const res: Migration[] = await dataSource.runMigrations()
  if (res && res.length) {
    console.log(res)
    console.log('Migrations ran successfully');
  }
  else {
    console.log('No migrations pending');
  }
  await dataSource.destroy()
}

const undoLastMigration = async () => {
  const dataSource = await dataSourceAsync()
  await dataSource.initialize()
  const migrations = await dataSource.query('SELECT * FROM migrations ORDER BY id DESC LIMIT 1')
  if (!migrations || !migrations.length) {
    console.log('No migrations to undo');
    await dataSource.destroy()
    return
  }
  console.log('Undoing last migration', migrations[0].name)
  await dataSource.undoLastMigration()
  console.log('Last Migration undid successfully');
  await dataSource.destroy()
}

const optionDefinitions = [
  { name: 'run', alias: 'r', type: Boolean },
  { name: 'undoLastMigration', alias: 'u', type: Boolean },
]
interface IOptions {
  run: boolean,
  undoLastMigration: boolean
}
const options: IOptions = commandLineArgs(optionDefinitions)

if (options.run) {
  runMigrations()
}

if (options.undoLastMigration) {
  undoLastMigration()
}
