import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateChatCompletionResponse } from 'openai';

import { ChatGptService, FlikiService } from './ai-services';
import {
  CreativeGenerateDto,
  GenerateImageDto,
  GenerateTextToSpeechDto,
  ParaphraseGenerateDto,
  VerseGenerateDto,
} from './dto';
import { BalanceService } from 'src/user/services';
import { ServiceTypeEnum } from 'src/shared/enum';
import { SERVICES, ServiceInfo } from 'src/shared/seeds-lists/services-prices';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class ContentAiService {
  constructor(
    private readonly chatGptService: ChatGptService,
    private readonly flikiService: FlikiService,
    private readonly balanceService: BalanceService,
    private readonly transactionService: TransactionService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async generateVerse(
    user: UserEntity,
    verseGenerateDto: VerseGenerateDto,
  ): Promise<string | CreateChatCompletionResponse> {
    const { service_type, service_qnt, neuron_qnt } =
      await this.serviceCheckedForAvailability(user.id, ServiceTypeEnum.VERSE);

    const verse = await this.chatGptService.generateVerseChatGpt(
      verseGenerateDto,
    );

    await this.createCharge(user, { service_type, service_qnt, neuron_qnt });

    return verse;
  }

  async generateCreative(
    user: UserEntity,
    creativeGenerateDto: CreativeGenerateDto,
  ): Promise<string | CreateChatCompletionResponse> {
    const { service_type, service_qnt, neuron_qnt } =
      await this.serviceCheckedForAvailability(
        user.id,
        ServiceTypeEnum.CREATIVE,
      );

    const creative = await this.chatGptService.generateCreativeChatGpt(
      creativeGenerateDto,
    );

    await this.createCharge(user, { service_type, service_qnt, neuron_qnt });

    return creative;
  }

  async generateParaphrase(
    user: UserEntity,
    paraphraseGenerateDto: ParaphraseGenerateDto,
  ): Promise<string | CreateChatCompletionResponse> {
    const { service_type, service_qnt, neuron_qnt } =
      await this.serviceCheckedForAvailability(
        user.id,
        ServiceTypeEnum.PARAPHRASE,
      );

    const paraphrase = await this.chatGptService.generateParaphraseChatGpt(
      paraphraseGenerateDto,
    );

    await this.createCharge(user, { service_type, service_qnt, neuron_qnt });

    return paraphrase;
  }

  async generateTextToSpeech(
    user: UserEntity,
    generateTextToSpeechDto: GenerateTextToSpeechDto,
  ): Promise<any> {
    const { service_type, service_qnt, neuron_qnt } =
      await this.serviceCheckedForAvailability(
        user.id,
        ServiceTypeEnum.TEXT_TO_SPEECH,
      );

    const textToSpeech = await this.flikiService.generateTextToSpeechFliki(
      generateTextToSpeechDto,
    );

    await this.createCharge(user, { service_type, service_qnt, neuron_qnt });

    return textToSpeech;
  }

  async generateTextToImage(
    user: UserEntity,
    generateImageDto: GenerateImageDto,
  ): Promise<any> {
    const { service_type, service_qnt, neuron_qnt } =
      await this.serviceCheckedForAvailability(user.id, ServiceTypeEnum.IMAGE);

    const image = await this.flikiService.generateTextToImageFliki(
      generateImageDto,
    );

    await this.createCharge(user, { service_type, service_qnt, neuron_qnt });

    return image;
  }

  async serviceCheckedForAvailability(
    userId: string,
    serviceType: ServiceTypeEnum,
  ) {
    const info = this.getServiceInfo(serviceType);

    const isBalanceAvailable = await this.balanceService.isQntAvailable(
      userId,
      info.service_qnt,
    );

    if (!isBalanceAvailable) {
      throw new BadRequestException('Not enough neurons on your account');
    }

    return info;
  }

  getServiceInfo(service: string): ServiceInfo {
    return SERVICES.find((e: ServiceInfo) => e.service_type === service);
  }

  async createCharge(user: UserEntity, info: ServiceInfo) {
    await this.entityManager.transaction(async (transactionManager) => {
      await this.transactionService.createWritingOffTransaction(
        user,
        info,
        transactionManager,
      );

      await this.balanceService.changeBalance(
        user.id,
        -info.neuron_qnt,
        transactionManager,
      );
    });
  }
}
