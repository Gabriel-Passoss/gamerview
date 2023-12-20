import { makeGame } from 'test/factories/game-factory'
import { CreateReviewService } from './create-review'
import { InMemoryReviewsRepository } from 'test/repositories/in-memory-reviews-repository'

let inMemoryReviewsRepository: InMemoryReviewsRepository
let sut: CreateReviewService

describe('Create a review', () => {
  beforeEach(() => {
    inMemoryReviewsRepository = new InMemoryReviewsRepository()

    sut = new CreateReviewService(inMemoryReviewsRepository)
  })

  it('should be able to create a review', async () => {
    const result = await sut.execute({
      reviewerId: '1',
      title: 'New review',
      game: makeGame(),
      content: 'This is a new review',
      hoursOfGameplay: 100,
      isCompleted: true,
      rate: 3,
    })

    expect(result.isRight()).toBe(true)
  })
})
