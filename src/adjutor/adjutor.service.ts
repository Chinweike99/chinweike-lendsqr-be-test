import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BlacklistResponse } from './interfaces/blacklist.interface';

@Injectable()
export class AdjutorService {
  constructor(private readonly httpService: HttpService) {}

  async checkBlacklist(phoneNumber: string, email: string,): Promise<BlacklistResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.ADJUTOR_BASE_URL}/verification/karma`,
          {
            phoneNumber,
            email,
          },
          {
            headers: {
              'x-api-key': process.env.ADJUTOR_API_KEY,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      // If API fails, The registration should fail
      // This ensures security - better to reject than allow blacklisted users
      throw new HttpException(
        'Unable to verify user eligibility. Please try again later.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}