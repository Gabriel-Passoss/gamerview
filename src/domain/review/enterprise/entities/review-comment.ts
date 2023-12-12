import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface ReviewCommentProps extends CommentProps {
  reviewId: UniqueEntityID
}

export class ReviewComment extends Comment<ReviewCommentProps> {
  get reviewId() {
    return this.props.reviewId
  }

  static create(
    props: Optional<ReviewCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const reviewComment = new ReviewComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return reviewComment
  }
}
