export default function getConfig(): {
  xeroBaseURL: string;
  myobBaseURL: string;
  enableAccountingSoftwareSimulation: boolean;
  decisionEngineBaseURL: string;
  enableDecisionEngineSimulation: boolean;
} {
  return {
    xeroBaseURL: process.env.XERO_BASE_URL || 'https://api.xero.com/finance.xro/1.0',
    myobBaseURL: process.env.MYOB_BASE_URL || 'https://arl2.api.myob.com',
    enableAccountingSoftwareSimulation:
      String(process.env.ENABLE_ACCOUNTING_SOFTWARE_SIMULATION).toLowerCase() === 'true' || false,
    decisionEngineBaseURL: process.env.DECISION_ENGINE_BASE_URL || 'https://my-decision-engine.com',
    enableDecisionEngineSimulation:
      String(process.env.ENABLE_DECISION_ENGINE_SIMULATION).toLowerCase() === 'true' || false,
  };
}
