export const AsyncStatus = {
  idle: "idle",
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
} as const;

export type AsyncStatusType =
  | (typeof AsyncStatus)["idle"]
  | (typeof AsyncStatus)["pending"]
  | (typeof AsyncStatus)["fulfilled"]
  | (typeof AsyncStatus)["rejected"];

export type ErrorItem = {
  code: string;
  message: string;
};

export type AsyncBaseReducer<TData> = {
  status: AsyncStatusType;
  data: TData | unknown;
  errors: ErrorItem[] | unknown;
};
