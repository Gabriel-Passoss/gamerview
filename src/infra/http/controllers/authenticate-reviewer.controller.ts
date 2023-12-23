import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AuthenticateReviewerService } from '@/domain/review/application/services/authenticate-reviewer'
import { WrongCredentialsError } from '@/domain/review/application/services/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'

const authenticateAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateAccountBodySchema = z.infer<
  typeof authenticateAccountBodySchema
>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(
    private readonly authenticateReviewer: AuthenticateReviewerService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateAccountBodySchema))
  async handle(@Body() body: AuthenticateAccountBodySchema) {
    const { email, password } = body

    const result = await this.authenticateReviewer.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
