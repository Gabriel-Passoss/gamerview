import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RegisterReviewerService } from '@/domain/review/application/services/register-reviewer'
import { Public } from '@/infra/auth/public'
import { ReviewerAlreadyExistsError } from '@/domain/review/application/services/errors/reviewer-already-exists-error'

const registerAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  nickname: z.string(),
  birthday: z.coerce.date(),
})

type RegisterAccountBodySchema = z.infer<typeof registerAccountBodySchema>

@Controller('/accounts')
@Public()
export class RegisterReviewerController {
  constructor(private readonly registerReviewer: RegisterReviewerService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerAccountBodySchema))
  async handle(@Body() body: RegisterAccountBodySchema) {
    const { email, password, name, nickname, birthday } = body

    const result = await this.registerReviewer.execute({
      email,
      password,
      name,
      nickname,
      birthday,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReviewerAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
