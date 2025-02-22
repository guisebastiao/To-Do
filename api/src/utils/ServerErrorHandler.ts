export interface FieldError {
  error: string;
  field: string;
}

export interface FieldErrors {
  fieldErrors: FieldError[];
}

export class ServerError extends Error {
  status: number;
  message: string;
  fieldErrors?: FieldError[];

  constructor(statusCode: number, message: string, fieldErrors?: FieldError[]) {
    super(message);
    this.status = statusCode;
    this.message = message;
    this.fieldErrors = fieldErrors;
  }

  getResponse() {
    return {
      status: this.status,
      message: this.message,
      fieldErrors: this.fieldErrors || [],
    };
  }
}
