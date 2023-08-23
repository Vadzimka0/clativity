import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import {
  QUICKPAYMENTS_API_URL,
  QUICKPAYMENTS_URI_V3_SESSIONS,
} from 'src/shared/constants';
import { OrderInfoType } from '../types/order-info.type';

@Injectable()
export class QuickPaymentsService {
  private readonly headers: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.headers = {
      Authorization: `Token token=${configService.get(
        'QUICKPAYMENTS_API_TOKEN',
      )}`,
      'Content-Type': 'application/json',
    };
  }

  async createPayment(data: OrderInfoType): Promise<AxiosResponse> {
    try {
      return await firstValueFrom(
        this.httpService.post(
          `${QUICKPAYMENTS_API_URL}/${QUICKPAYMENTS_URI_V3_SESSIONS}`,
          data,
          {
            headers: this.headers,
          },
        ),
      );
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getPaymentBySessionId(session_id: string): Promise<AxiosResponse> {
    try {
      return await firstValueFrom(
        this.httpService.get(
          `${QUICKPAYMENTS_API_URL}/${QUICKPAYMENTS_URI_V3_SESSIONS}/${session_id}`,
          {
            headers: this.headers,
          },
        ),
      );
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getCreatedPaymentData(orderInfo: OrderInfoType): Promise<any> {
    const payment = await this.createPayment(orderInfo);

    return payment.data;
  }

  async getPaymentInfo(session_id: string): Promise<any> {
    const paymentInfo = await this.getPaymentBySessionId(session_id);

    return paymentInfo.data;
  }
}
