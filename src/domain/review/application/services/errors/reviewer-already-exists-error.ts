import { ServiceError } from '@/core/errors/service-error'

export class ReviewerAlreadyExistsError extends Error implements ServiceError {
  constructor(identifier: string) {
    super(`Reviewer "${identifier}" already exists.`)
  }
}
