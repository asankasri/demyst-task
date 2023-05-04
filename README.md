# Demyst Task

Solution of the Demyst task (https://github.com/DemystData/code-kata)

Implemented by: *Asanka Piyasekara*

### Main components

* Server (Refer [README](./server/README.md))
* Client (Refer [README](./client/README.md))

### How to run (without Docker)

* Navigate to root directory.
* Run `yarn && yarn start`.
* Navigate to http://localhost:8000/

*(Note: server is running on http://localhost:8001/)*

Run `yarn test` to run the tests (of both client and server).

### How to run (with Docker)

* Navigate to root directory.
* Run `docker-composer up`.
* Navigate to http://localhost:8000/

### Demo

![screencast](screencast.gif)

### Main technologies used

* Node.js/ Typescript for server.
* Express as the server framework.
* React for client application (using Create React App).
* Bootstrap for UI.
* axios for making http requests.

### Possible future enhancements

* Better error handling and logging.
* Write more unit tests in both client and server.

### Notes to the reviewer ###

* Neither a state management library nor React Context API have been used in the React app. Instead data fetching has been done in `useEffect()` and pass the data to the child components as Props.
* It would have been great to have more unit tests, but I just tried to write tests for more critical logics only.
* No database has been used to keep the implementation simple.
* As discussed, there is no UI styling and it is very simple.
* There is a documentation of Accounting Software Connector. (Refer [README](./server/src/services/accountingSoftwareConnector/README.md)).

### Simulation ###

* Accounting Software Connector is just returning a hardcoded Balance Sheet.
* Decision Engine connector returns `{approved:true}` if the loan amount has less than 10 digits, else it returns `{approved:false}`.
