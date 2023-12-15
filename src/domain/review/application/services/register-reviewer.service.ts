import { Either, left, right } from '@/core/either'
import { ReviewerAlreadyExistsError } from './errors/reviewer-already-exists-error'
import { Reviewer } from '../../enterprise/entities/reviewer'
import { Injectable } from '@nestjs/common'
import { ReviewersRepository } from '../repositories/reviewers-respository'

interface RegisterReviewerServiceRequest {
  name: string
  email: string
  password: string
  nickname: string
  birthday: Date
}

type RegisterReviewerServiceResponse = Either<
  ReviewerAlreadyExistsError,
  {
    reviewer: Reviewer
  }
>

@Injectable()
export class RegisterReviewerService {
  constructor(private readonly reviewersRepository: ReviewersRepository) {}

  async execute({
    name,
    email,
    password,
    nickname,
    birthday,
  }: RegisterReviewerServiceRequest): Promise<RegisterReviewerServiceResponse> {
    const reviewerWithSameEmail = await this.reviewersRepository.findByEmail(
      email,
    )
    const reviewerWithSameNickname =
      await this.reviewersRepository.findByNickname(nickname)

    if (reviewerWithSameEmail) {
      return left(new ReviewerAlreadyExistsError(email))
    }

    if (reviewerWithSameNickname) {
      return left(new ReviewerAlreadyExistsError(nickname))
    }

    const reviewer = Reviewer.create({
      name,
      email,
      password,
      nickname,
      birthday,
    })

    await this.reviewersRepository.create(reviewer)

    return right({
      reviewer,
    })
  }
}
