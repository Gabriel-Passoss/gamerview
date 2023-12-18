import { Either, left, right } from '@/core/either'
import { Reviewer } from '../../enterprise/entities/reviewer'
import { Injectable } from '@nestjs/common'
import { ReviewersRepository } from '../repositories/reviewers-respository'
import { HashGenerator } from '../crypto/hash-generator'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { HashComparer } from '../crypto/hash-comparer'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface EditReviewerServiceRequest {
  reviewerId: string
  name?: string
  email?: string
  password?: string
  oldPassword?: string
  nickname?: string
  profileImageUrl?: string
  subtitle?: string
}

type EditReviewerServiceResponse = Either<
  ResourceNotFoundError,
  {
    reviewer: Reviewer
  }
>

@Injectable()
export class EditReviewerService {
  constructor(
    private readonly reviewersRepository: ReviewersRepository,
    private readonly hashComparer: HashComparer,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    reviewerId,
    name,
    oldPassword,
    password,
    email,
    nickname,
    profileImageUrl,
    subtitle,
  }: EditReviewerServiceRequest): Promise<EditReviewerServiceResponse> {
    const reviewer = await this.reviewersRepository.findById(reviewerId)

    if (!reviewer) {
      return left(new ResourceNotFoundError())
    }

    if (password && oldPassword) {
      const isPasswordValid = await this.hashComparer.compare(
        oldPassword,
        reviewer.password,
      )
      console.log(oldPassword)
      console.log(reviewer.password)
      console.log(isPasswordValid)

      if (!isPasswordValid) {
        return left(new WrongCredentialsError())
      }

      const newPassword = await this.hashGenerator.hash(password)
      reviewer.password = newPassword
    }

    reviewer.name = name ?? reviewer.name

    reviewer.email = email ?? reviewer.email
    reviewer.nickname = nickname ?? reviewer.nickname
    reviewer.profileImageUrl = profileImageUrl ?? reviewer.profileImageUrl
    reviewer.subtitle = subtitle ?? reviewer.subtitle

    await this.reviewersRepository.save(reviewer)

    return right({
      reviewer,
    })
  }
}
