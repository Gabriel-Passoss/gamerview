import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { DeleteReviewerService } from '@/domain/review/application/services/delete-reviewer'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ResourceNotFoundError } from '@/domain/review/application/services/errors/resource-not-found-error'

@Controller('/accounts/:id')
export class DeleteReviewerController {
  constructor(private readonly deleteReviewerService: DeleteReviewerService) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') reviewerId: string,
  ) {
    if (user.sub !== reviewerId) {
      throw new UnauthorizedException()
    }

    const result = await this.deleteReviewerService.execute({
      reviewerId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      reviewer: result.value,
    }
  }
}
