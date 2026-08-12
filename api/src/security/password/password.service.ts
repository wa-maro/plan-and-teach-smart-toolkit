import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private readonly config: ConfigService) {}

  /**
   * Hash the password in plain text
   * @param plain string
   * @returns Promise string
   */
  hash(plain: string): Promise<string> {
    const rounds = this.config.getOrThrow<number>('BCRYPT_ROUNDS', 12);
    return bcrypt.hash(plain, rounds);
  }

  /**
   * Compare plain password against encripted version
   * @param plain string
   * @param hashed string
   * @returns Promise boolean
   */
  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
