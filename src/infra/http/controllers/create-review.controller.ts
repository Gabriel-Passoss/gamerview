import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateReviewService } from '@/domain/review/application/services/create-review'

const createReviewBodySchema = z.object({
  reviewerId: z.string().uuid(),
  gameId: z.string().uuid(),
  title: z.string(),
  hoursOfGameplay: z.coerce.number(),
  isCompleted: z.boolean(),
  content: z.string(),
  rate: z.coerce.number(),
})

type CreateReviewBodySchema = z.infer<typeof createReviewBodySchema>

@Controller('/reviews')
export class CreateReviewController {
  constructor(private readonly createReview: CreateReviewService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createReviewBodySchema))
  async handle(@Body() body: CreateReviewBodySchema) {
    const {
      reviewerId,
      gameId,
      title,
      hoursOfGameplay,
      isCompleted,
      content,
      rate,
    } = body

    const result = await this.createReview.execute({
      reviewerId,
      gameId,
      title,
      hoursOfGameplay,
      isCompleted,
      content,
      rate,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      review: result.value,
    }
  }
}
