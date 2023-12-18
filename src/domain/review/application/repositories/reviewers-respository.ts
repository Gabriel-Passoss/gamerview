import { Reviewer } from '../../enterprise/entities/reviewer'

export abstract class ReviewersRepository {
  abstract findById(id: string): Promise<Reviewer | null>
  abstract findByNickname(nickname: string): Promise<Reviewer | null>
  abstract findByEmail(email: string): Promise<Reviewer | null>
  abstract create(reviewer: Reviewer): Promise<void>
  abstract save(reviewer: Reviewer): Promise<void>
  abstract delete(reviewer: Reviewer): Promise<void>
}
