import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { GetReviewerByIdService } from '@/domain/review/application/services/get-reviewer-by-id'
import { Public } from '@/infra/auth/public'
import { ResourceNotFoundError } from '@/domain/review/application/services/errors/resource-not-found-error'
import { ReviewerPresenter } from '../presenters/reviewer-presenter'

@Controller('/accounts/:id')
@Public()
export class GetReviewerController {
  constructor(private readonly getReviewerById: GetReviewerByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') reviewerId: string) {
    const result = await this.getReviewerById.execute({
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
      reviewer: ReviewerPresenter.toHTTP(result.value.reviewer),
    }
  }
}
