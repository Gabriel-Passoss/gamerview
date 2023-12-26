import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate-reviewer.controller'
import { AuthenticateReviewerService } from '@/domain/review/application/services/authenticate-reviewer'
import { CryptoModule } from '../crypto/crypto.module'
import { RegisterReviewerController } from './controllers/register-reviewer.controller'
import { RegisterReviewerService } from '@/domain/review/application/services/register-reviewer'
import { EditReviewerProfileController } from './controllers/edit-reviewer-profile.controller'
import { EditReviewerService } from '@/domain/review/application/services/edit-reviewer'

@Module({
  imports: [DatabaseModule, CryptoModule],
  controllers: [
    AuthenticateController,
    RegisterReviewerController,
    EditReviewerProfileController,
  ],
  providers: [
    AuthenticateReviewerService,
    RegisterReviewerService,
    EditReviewerService,
  ],
})
export class HttpModule {}
