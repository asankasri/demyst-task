export default function getConfig(): {
  xeroBaseURL: string;
  myobBaseURL: string;
  enableSimulation: boolean;
} {
  return {
    xeroBaseURL: process.env.XERO_BASE_URL || 'https://api.xero.com/finance.xro/1.0',
    myobBaseURL: process.env.MYOB_BASE_URL || 'https://arl2.api.myob.com',
    enableSimulation: String(process.env.ENABLE_SIMULATION).toLowerCase() === 'true' || false,
  };
}
