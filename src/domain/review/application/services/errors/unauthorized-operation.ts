import { ServiceError } from '@/core/errors/service-error'

export class UnauthorizedOperation extends Error implements ServiceError {
  constructor() {
    super('Unauthorized operation')
  }
}
