import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import { FLIKI_API_URL } from 'src/shared/constants';
import {
  GenerateImageDto,
  GenerateTextToSpeechDto,
  TextToSpeechVoicesDto,
} from '../dto';

@Injectable()
export class FlikiService {
  private readonly headers: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.headers = {
      Authorization: `Bearer ${configService.get('FLIKI_API_KEY')}`,
      'Content-Type': 'application/json',
    };
  }

  async getLanguages(): Promise<AxiosResponse> {
    const response = await lastValueFrom(
      this.httpService.get(`${FLIKI_API_URL}/languages`, {
        headers: this.headers,
      }),
    );

    if (response.data?.success === false) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return response.data.data;
  }

  async getDialects(): Promise<AxiosResponse> {
    const response = await lastValueFrom(
      this.httpService.get(`${FLIKI_API_URL}/dialects`, {
        headers: this.headers,
      }),
    );

    if (response.data?.success === false) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return response.data.data;
  }

  async getVoices(data: TextToSpeechVoicesDto): Promise<AxiosResponse> {
    const response = await lastValueFrom(
      this.httpService.post(`${FLIKI_API_URL}/voices`, data, {
        headers: this.headers,
      }),
    );

    if (response.data?.success === false) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return response.data.data;
  }

  async generateTextToSpeechFliki(
    data: GenerateTextToSpeechDto,
  ): Promise<AxiosResponse> {
    const response = await lastValueFrom(
      this.httpService.post(`${FLIKI_API_URL}/generate/text-to-speech`, data, {
        headers: this.headers,
      }),
    );

    if (response.data?.success === false) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return response.data.data;
  }

  async generateTextToImageFliki(
    data: GenerateImageDto,
  ): Promise<AxiosResponse> {
    const response = await lastValueFrom(
      this.httpService.post(`${FLIKI_API_URL}/generate/text-to-image`, data, {
        headers: this.headers,
      }),
    );

    if (response.data?.success === false) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return response.data.data;
  }
}
