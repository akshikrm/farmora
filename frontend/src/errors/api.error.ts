export type ErrorTest = {
  name: string;
  message: string;
};

export class ValidationError extends Error {
  error: ErrorTest[];
  constructor(err: { message: string; error: ErrorTest[] }) {
    super(err.message);
    this.error = err.error;
  }
}
