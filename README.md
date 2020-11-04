# definitive guide for Nest.js guards and Passport

This sample repo aims at covering the different implementations when it comes to Nest.js and Passport in an Express context.

It is related to this Medium article : [Definitive guide for Nest.js guards and Passport
](https://romain-kelifa.medium.com/definitive-guide-for-nest-js-guards-and-passport-57915cfb6fd)

---

## Test

### By yourself

#### Installation

Make sure Node.js is installed (either manually or from [NVM](https://github.com/nvm-sh/nvm)) first.

```sh
npm install
```

#### Run

As easy as :

```sh
npm run test
```

### By looking at the CI

Just have a look at the [GitHub Action output](https://github.com/Roms1383/definitive-guide-nestjs-guard-passport/actions) !

---

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
