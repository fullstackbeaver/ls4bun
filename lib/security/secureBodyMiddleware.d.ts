import type { WorkingRequest } from "server/httpServer_type";
export declare function sanitizeInput(input: unknown): unknown;
export declare function extractBody(request: WorkingRequest): Promise<unknown>;
