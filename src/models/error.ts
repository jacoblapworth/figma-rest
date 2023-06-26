export type ErrorCodes =
  /** Invalid parameter. The "message" parameter on the response will describe the error. */
  | 400
  /** Issue with authentication. The "message" parameter on the response will describe the error. */
  | 401
  /** API is not available. Possible error messages are "Limited by Figma plan," "Incorrect account type," or "Invalid scope". */
  | 403
  /** 	The specified file was not found */
  | 404
  /** Request payload too large. The max allowed body size is 4MB. */
  | 413
