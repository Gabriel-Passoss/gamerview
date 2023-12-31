import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { DeleteReviewService } from '@/domain/review/application/services/delete-review'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ResourceNotFoundError } from '@/domain/review/application/services/errors/resource-not-found-error'
import { UnauthorizedOperation } from '@/domain/review/application/services/errors/unauthorized-operation'

@Controller('/reviews/:id')
export class DeleteReviewController {
  constructor(private readonly deleteReview: DeleteReviewService) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @Param('id') reviewId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.deleteReview.execute({
      reviewId,
      reviewerId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case UnauthorizedException:
          throw new UnauthorizedOperation()
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      review: result.value,
    }
  }
}
