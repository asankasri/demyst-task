import { Route } from '../utils';
import healthcheckRoutes from './healthcheck';
import loanRoutes from './loan';

export default [...healthcheckRoutes, ...loanRoutes] as Route[];
