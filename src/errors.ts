export class VagoError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly responseBody?: unknown,
  ) {
    super(message);
    this.name = 'VagoError';
  }
}

export class VagoAuthError extends VagoError {
  constructor(message = 'Unauthorized', responseBody?: unknown) {
    super(message, 401, responseBody);
    this.name = 'VagoAuthError';
  }
}

export class VagoNotFoundError extends VagoError {
  constructor(message = 'Not found', responseBody?: unknown) {
    super(message, 404, responseBody);
    this.name = 'VagoNotFoundError';
  }
}

export class VagoValidationError extends VagoError {
  constructor(message = 'Validation error', responseBody?: unknown) {
    super(message, 400, responseBody);
    this.name = 'VagoValidationError';
  }
}
