/**
 * Defines the shape of a generic HTTP calling function.
 * @template ReturnedType The expected return type of the API call.
 * @template ArgType The type of the data or parameters being sent.
 */
export type HttpCaller = <ReturnedType, ArgType>(
  url: string,
  reqData: ArgType,
) => Promise<ReturnedType | unknown>;