import { GetDecisionRequest, GetDecisionResponse } from './types';

export interface ConnectorInterface {
  getDecision(request: GetDecisionRequest): Promise<GetDecisionResponse>;
}
