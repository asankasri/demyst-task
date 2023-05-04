## Demyst Task - Server

Server side implementation of the task, https://github.com/DemystData/code-kata.

### Main Technologies

* Node.js
* Typescript
* Express

### How to use

* Run `yarn && yarn dev` to run in local development.
* Run `yarn test` to run the tests.
* Run `yarn && yarn build && yarn server` to run in production.

### Environments variables

* `SERVER_PORT` (default=3001)
* `XERO_BASE_URL` (default=https://api.xero.com/finance.xro/1.0)
* `MYOB_BASE_URL` (default=https://arl2.api.myob.com)
* `DECISION_ENGINE_BASE_URL` (default=https://my-decision-engine.com)
* `ENABLE_ACCOUNTING_SOFTWARE_SIMULATION` (default=false)
* `ENABLE_DECISION_ENGINE_SIMULATION` (default=false)
