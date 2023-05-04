## Accounting Software Connector

This will provide the connection to the different accounting softwares with same features but with different endpoints and input/output data formats.

*Assumption: The endpoints provided by accounting softwares are RESTful APIs.*

### What this does

Basically the connector is middle man of the application and the accounting softwares. For a given function it performs the below actions.
* Receive the request provided by the application
* Validate request parameters
* Convert the request parameters (parsing)
* Call to the relevant accounting software endpoint
* Get the response and convert it (parsing)
* Return the converted response to the application

### Currently supported accounting softwares
* Xero
* MYOB

### Currently supported functions
* getBalanceSheet

### How to use

Simply call the ConnectorProvider with configurations. See the example below.

```
import { ConnectorProvider as AccountingSoftwareConnector } from '{PATH_FROM_YOUR_FILE}/ConnectorProvider';

try {
    const connector = AccountingSoftwareConnector.getApi(connectorID, {
        baseUrl: connectorAPIBaseURL,
        hearers: connectorAPIHeaders,
        simulation: isSimulationEnabled,
    });

    const balanceSheet = await connector.getBalanceSheet({});

    return {
        accountingProvider,
        balanceSheet,
    };
} catch (error) {
    console.log(error);
    throw error;
}
```

Examples config values values:

* `connectorId`: `XERO`
* `connectorAPIBaseURL`: `https://api.xero.com/finance.xro/1.0`
* `connectorAPIHeaders`: `{ Authentication: 'Bearer xxxxxxxxxx' }`
* `isSimulationEnabled`: `false` (if set to true, the actual API will not be called and return hardcoded data instead)

### How to expand

It's possible to expand this feature by adding new functions and/or by adding new software connectors.

**To add a new functions:**

* Add the function in the ApiName enum (`./enums/apiName.ts`)
* Add the request and response types (`./types/index.ts`)
* Add the new function in the ConnectorInterface (`./ConnectorInterface.ts`)
* Do the implementation in the Connector (`./Connector`)
* Finally, in the each software connector (ex: `./xeroConnector/`), add the API path (ex: `./xeroConnector/enums/apiPaths.ts`), add parsers and validators, and then do the implementation in the API class (ex: `./xeroConnector/XeroApi.ts`).

**To add a new software connector:**

* Add the connector name in `./enums/connectorName.ts`
* Add the base URL in the config file (`server/src/utils/getConfig.ts`)
* Refer existing software connector (ex: `./xeroConnector/`) and duplicate to a new directory (ex: `./abcConnector` if the software name is Abc) and change the file names & the class names accordingly.
* Change the API paths (ex: `./abcConnector/enums/apiPaths.ts`)
* Change the logics in the parsers and validators.
* Finally, conditionally return the new software connector in `./ConnectorProvider.ts`
