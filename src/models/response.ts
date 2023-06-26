import { ErrorCodes } from './error.js'

export type FigmaSuccessResponse<T> = {
  status: ErrorCodes | number
  error: false
  meta: T
}

export type FigmaErrorResponse = {
  status: ErrorCodes
  error: true
  message: string
}

export type FigmaResponse<T> = FigmaSuccessResponse<T> | FigmaErrorResponse

export type FigmaPagination = {
  pagination: {
    prev_page: string
    next_page: string
  }
}

export type PaginatedResponse<T> = T & FigmaPagination
