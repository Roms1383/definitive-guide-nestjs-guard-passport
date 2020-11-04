import { UseGuards } from '@nestjs/common'
import * as chalk from 'chalk'

type ClassType = {
  name: string
}
type GuardInfo = {
  guard: ClassType
  strategies?: ClassType | ClassType[]
}
const arraify = value => (Array.isArray(value) ? value : [value])
const wrap: any = {}
wrap.strategies = (strategies: ClassType | ClassType[]) =>
  chalk.yellow(
    arraify(strategies)
      .map(({ name }) => name)
      .join(', '),
  )
wrap.guards = (guards: GuardInfo[]) =>
  guards
    .map(({ guard, strategies }) =>
      !strategies
        ? chalk.magenta(guard.name)
        : chalk.magenta(guard.name) +
          chalk.magenta('(') +
          wrap.strategies(strategies) +
          chalk.magenta(')'),
    )
    .join(chalk.magenta(', '))

export default (guards: GuardInfo | GuardInfo[]): string =>
  chalk.red(`@${UseGuards.name}`) +
  chalk.red('(') +
  wrap.guards(arraify(guards)) +
  chalk.red(')')
