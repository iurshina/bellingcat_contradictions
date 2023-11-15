export interface LogMessageRecord {
  type: "LOG" | "API_CALL" | "INTROSPECTION" | "STATE";
  createdAt: number;
  content: string;
}
