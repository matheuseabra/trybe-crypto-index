# Trybe Challenge - Crypto Index 💱💰️

These instructions will get you a copy of of the project up and running in development mode on your local machine.

### Quickstart Setup 

Clone the project and enter the root folder:

```
$ git clone https://github.com/matheuseabra/trybe-crypto-index
$ cd trybe-crypto-index
```

Intall dependencies and start server in development mode:

```
$ cd server
$ npm i && npm run dev
```

Install dependencies and start app in development mode:
```
$ cd ../client
$ npm i && npm run dev
```

Open the browser at (http://localhost:3000)[http://localhost:3000] to view the client app in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Running tests 

Run tests on the server:

```
$ cd server
$ npm test
```

Run tests on the client:

```
$ cd ../client
$ npm test
```

## Technologies/tools

- TypeScript
- Node.js
- Next.js
- CSS modules
- Jest
- ESlint
- Prettier
- Babel
- @testing-library/react
- supertest

## Improvements
  - Setup CI/CD such as (CircleCI)[https://circleci.com/] or (GitHub Actions)[https://github.com/features/actions]
  - "Dockerize" client and server for deployment.
  - Add API documentation with [swagger-express-ts](https://github.com/olivierlsc/swagger-express-ts).
  - Add dependency injection of services into controllers with (inversify)[https://www.npmjs.com/package/inversify].
  - Refactor to Domain-driven approach in order to modularize the architecture by features.


## Lincense

This project is lincensed under the GNU General Public License v3.0

