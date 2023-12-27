import { Reviewer } from '@/domain/review/enterprise/entities/reviewer'

export class ReviewerPresenter {
  static toHTTP(reviewer: Reviewer) {
    return {
      id: reviewer.id.toString(),
      email: reviewer.email,
      password: reviewer.password,
      nickname: reviewer.nickname,
      profileImageUrl: reviewer.profileImageUrl,
      subtitle: reviewer.subtitle,
      birthday: reviewer.birthday,
      createdAt: reviewer.createdAt,
    }
  }
}
