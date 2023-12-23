import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate-reviewer.controller'
import { AuthenticateReviewerService } from '@/domain/review/application/services/authenticate-reviewer'
import { CryptoModule } from '../crypto/crypto.module'

@Module({
  imports: [DatabaseModule, CryptoModule],
  controllers: [AuthenticateController],
  providers: [AuthenticateReviewerService],
})
export class HttpModule {}
