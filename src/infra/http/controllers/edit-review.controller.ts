import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditReviewService } from '@/domain/review/application/services/edit-review'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ResourceNotFoundError } from '@/domain/review/application/services/errors/resource-not-found-error'
import { UnauthorizedOperation } from '@/domain/review/application/services/errors/unauthorized-operation'

const editReviewBodySchema = z.object({
  title: z.string().optional(),
  hoursOfGameplay: z.number().optional(),
  isCompleted: z.boolean().optional(),
  content: z.string().optional(),
  rate: z.number().optional(),
})

type EditReviewBodySchema = z.infer<typeof editReviewBodySchema>
const bodyValidationPipe = new ZodValidationPipe(editReviewBodySchema)

@Controller('/reviews/:id')
export class EditReviewController {
  constructor(private readonly editReview: EditReviewService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditReviewBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') reviewId: string,
  ) {
    const { title, hoursOfGameplay, isCompleted, content, rate } = body

    const result = await this.editReview.execute({
      reviewId,
      reviewerId: user.sub,
      title,
      hoursOfGameplay,
      isCompleted,
      content,
      rate,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case UnauthorizedOperation:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      review: result.value,
    }
  }
}
