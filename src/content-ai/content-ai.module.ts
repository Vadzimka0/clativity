import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ContentAiService } from './content-ai.service';
import { ContentAiController } from './content-ai.controller';
import { ChatGptService, FlikiService } from './ai-services';
import { UserModule } from 'src/user/user.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [HttpModule, UserModule, TransactionModule],
  controllers: [ContentAiController],
  providers: [ContentAiService, ChatGptService, FlikiService],
})
export class ContentAiModule {}
