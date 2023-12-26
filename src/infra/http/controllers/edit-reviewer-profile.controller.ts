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
import { WrongCredentialsError } from '@/domain/review/application/services/errors/wrong-credentials-error'
import { EditReviewerService } from '@/domain/review/application/services/edit-reviewer'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ResourceNotFoundError } from '@/domain/review/application/services/errors/resource-not-found-error'

const editAccountBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  oldPassword: z.string().optional(),
  nickname: z.string().optional(),
  subtitle: z.string().optional(),
})

type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>
const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)

@Controller('/accounts/:id')
export class EditReviewerProfileController {
  constructor(private readonly editReviewerService: EditReviewerService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') reviewerId: string,
  ) {
    const { email, password, name, nickname, oldPassword, subtitle } = body

    if (user.sub !== reviewerId) {
      throw new UnauthorizedException()
    }

    const result = await this.editReviewerService.execute({
      reviewerId,
      email,
      password,
      name,
      nickname,
      oldPassword,
      subtitle,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      reviewer: result.value,
    }
  }
}
