import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/review/application/crypto/encrypter'
import { HashGenerator } from '@/domain/review/application/crypto/hash-generator'
import { HashComparer } from '@/domain/review/application/crypto/hash-comparer'

import { JWTEncrypter } from './jwt-encrypter'
import { BCryptHasher } from './bcrypt-hasher'

@Module({
  imports: [],
  providers: [
    {
      provide: Encrypter,
      useClass: JWTEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: BCryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BCryptHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptoModule {}
