import { ConnectorName } from './../services/accountingSoftwareConnector/enums/connectorName';
import getConfig from '../utils/getConfig';

const config = getConfig();

export default {
  [ConnectorName.XERO]: {
    id: ConnectorName.XERO,
    label: 'Xero',
    apiBaseURL: config.xeroBaseURL,
  },
  [ConnectorName.MYOB]: {
    id: ConnectorName.MYOB,
    label: 'MYOB',
    apiBaseURL: config.myobBaseURL,
  },
};
