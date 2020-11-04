# definitive guide for Nest.js guards and Passport

This sample repo aims at covering the different implementations when it comes to Nest.js and Passport in an Express context.

## Installation

Make sure Node.js is installed (either manually or from [NVM](https://github.com/nvm-sh/nvm)) first.

```sh
npm install
```

## Integration tests

```sh
npm run test
```

## Quick refresher

### Guard

The most basic implementation.

### AuthGuard

Passport-based implementation.

- multiple strategies : the first strategy to succeed, redirect or error halts the chain
- multiple guards : succeeds if and only if all the guards succeed
- what can be injected ?
  - strategy: providers
  - guard: `ExecutionContext` and `Reflector`
- guard can store data on `request` before call to `super.canActivate`
