import { handleCors, handleBodyRequestParsing, handleCompression, handleHelmet } from './common';

let defaultMiddleware = [handleHelmet, handleCors, handleBodyRequestParsing, handleCompression];
const developmentMiddleware = [];

if (process.env.NODE_ENV === 'development') {
  defaultMiddleware = [...defaultMiddleware, ...developmentMiddleware];
}

export default [...defaultMiddleware];
