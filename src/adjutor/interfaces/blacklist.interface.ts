export interface BlacklistResponse {
  isBlacklisted: boolean;
  reason?: string;
  confidenceScore?: number;
  lastUpdated?: string;
}