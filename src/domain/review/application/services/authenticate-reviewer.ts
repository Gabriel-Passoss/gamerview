import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ReviewersRepository } from '../repositories/reviewers-respository'
import { HashComparer } from '../crypto/hash-comparer'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Encrypter } from '../crypto/encrypter'

interface AuthenticateReviewerServiceRequest {
  email: string
  password: string
}

type AuthenticateReviewerServiceResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateReviewerService {
  constructor(
    private readonly reviewersRepository: ReviewersRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateReviewerServiceRequest): Promise<AuthenticateReviewerServiceResponse> {
    const reviewerToAuthenticate = await this.reviewersRepository.findByEmail(
      email,
    )

    if (!reviewerToAuthenticate) {
      return left(new WrongCredentialsError())
    }

    const isValidPassword = await this.hashComparer.compare(
      password,
      reviewerToAuthenticate.password,
    )

    if (!isValidPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: reviewerToAuthenticate.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
