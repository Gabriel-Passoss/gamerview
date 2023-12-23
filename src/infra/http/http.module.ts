import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate-reviewer.controller'
import { AuthenticateReviewerService } from '@/domain/review/application/services/authenticate-reviewer'
import { CryptoModule } from '../crypto/crypto.module'
import { RegisterReviewerController } from './controllers/register-reviewer.controller'
import { RegisterReviewerService } from '@/domain/review/application/services/register-reviewer'

@Module({
  imports: [DatabaseModule, CryptoModule],
  controllers: [AuthenticateController, RegisterReviewerController],
  providers: [AuthenticateReviewerService, RegisterReviewerService],
})
export class HttpModule {}
