import { ValidationError } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config/default';

interface ErrorsInterface {
  toLog(): {
    errorId: string;
    message: string;
    code: number;
    isOwn: boolean;
    data: unknown;
    type: string;
    status: string;
    stack: Error['stack'];
    createdAt: string;
    errors: ValidationError[];
    environment: string;
    correlationId: string;
    version: string;
  };
  toResponse(): {
    errorId: string;
    message: string;
    status: string;
    createdAt: string;
    errors: ValidationError[];
  };
}

export interface CustomError extends Error {
  statusCode: number;
  httpCode: number;
  isOwn: boolean;
  data: unknown;
  errors: ValidationError[];
  status: string;
}
export default class ErrorAdapter implements ErrorsInterface {
  private errorId: string;
  private correlationId: string;
  public message: string;
  public code: number;
  private isOwn: boolean;
  private data: unknown;
  private type: string;
  private status: string;
  private stack: Error['stack'];
  private createdAt: string;
  private errors: ValidationError[];
  private environment: string;
  private version: string;
  constructor(error: CustomError, serviceStatusCode = 500) {
    this.errorId = uuidv4();
    this.correlationId = this.errorId;
    this.message = error.message;
    this.environment = config.environment;
    this.version = config.version;
    this.code = error.statusCode || error.httpCode || serviceStatusCode;
    this.isOwn = error.isOwn || false;
    this.data = error.data || {};
    this.type = Object.getPrototypeOf(error).constructor.name;
    this.status = error.status || 'ko';
    this.stack = error.stack;
    this.errors = error.errors;
    this.createdAt = new Date().toISOString();
  }

  toLog() {
    return {
      environment: this.environment,
      errorId: this.errorId,
      correlationId: this.correlationId,
      message: this.message,
      code: this.code,
      isOwn: this.isOwn,
      data: this.data,
      type: this.type,
      status: this.status,
      stack: this.stack,
      createdAt: this.createdAt,
      errors: this.errors,
      version: this.version,
    };
  }

  toResponse() {
    return {
      errorId: this.errorId,
      message: this.message,
      status: 'ko',
      createdAt: this.createdAt,
      errors: this.errors,
    };
  }
}
