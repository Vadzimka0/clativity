import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateChatCompletionResponse } from 'openai';

import { ContentAiService } from './content-ai.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  VERSES_STYLES,
  VerseStyle,
} from 'src/shared/seeds-lists/verses-styles';
import {
  CREATIVES_THEMES,
  CreativesThemes,
} from 'src/shared/seeds-lists/creatives-themes';
import {
  CreativeGenerateDto,
  GenerateImageDto,
  GenerateTextToSpeechDto,
  ParaphraseGenerateDto,
  TextToSpeechVoicesDto,
  VerseGenerateDto,
} from './dto';
import {
  COPYWRITING_STYLES,
  CopywritingStyle,
} from 'src/shared/seeds-lists/copywriting-styles';
import { FlikiService } from './ai-services';
import { ExpressRequestType } from 'src/auth/types';

@UseGuards(JwtAuthGuard)
@Controller()
export class ContentAiController {
  constructor(
    private readonly contentAiService: ContentAiService,
    private readonly flikiService: FlikiService,
  ) {}

  @Get('verses/styles')
  getVersesStyles(): VerseStyle[] {
    return VERSES_STYLES;
  }

  @Post('verses/generate')
  @HttpCode(200)
  async generateVerse(
    @Req() request: ExpressRequestType,
    @Body() verseGenerateDto: VerseGenerateDto,
  ): Promise<{ data: string | CreateChatCompletionResponse }> {
    const data = await this.contentAiService.generateVerse(
      request.user,
      verseGenerateDto,
    );

    return { data };
  }

  @Get('creative/themes')
  getCreativeThemes(): CreativesThemes {
    return CREATIVES_THEMES;
  }

  @Post('creative/generate')
  @HttpCode(200)
  async generateCreative(
    @Req() request: ExpressRequestType,
    @Body() creativeGenerateDto: CreativeGenerateDto,
  ): Promise<{ data: string | CreateChatCompletionResponse }> {
    const data = await this.contentAiService.generateCreative(
      request.user,
      creativeGenerateDto,
    );

    return { data };
  }

  @Get('paraphrase/styles')
  getCopywritingStyles(): CopywritingStyle[] {
    return COPYWRITING_STYLES;
  }

  @Post('paraphrase/generate')
  @HttpCode(200)
  async generateParaphrase(
    @Req() request: ExpressRequestType,
    @Body() paraphraseGenerateDto: ParaphraseGenerateDto,
  ): Promise<{ data: string | CreateChatCompletionResponse }> {
    const data = await this.contentAiService.generateParaphrase(
      request.user,
      paraphraseGenerateDto,
    );

    return { data };
  }

  @Get('text-to-speech/languages')
  async getLanguages() {
    const data = await this.flikiService.getLanguages();

    return { data };
  }

  @Get('text-to-speech/dialects')
  async getDialects() {
    const data = await this.flikiService.getDialects();

    return { data };
  }

  @Post('text-to-speech/voices')
  @HttpCode(200)
  async getVoices(@Body() textToSpeechVoicesDto: TextToSpeechVoicesDto) {
    const data = await this.flikiService.getVoices(textToSpeechVoicesDto);

    return { data };
  }

  @Post('text-to-speech/generate')
  @HttpCode(200)
  async generateTextToSpeech(
    @Req() request: ExpressRequestType,
    @Body() generateTextToSpeechDto: GenerateTextToSpeechDto,
  ) {
    const data = await this.contentAiService.generateTextToSpeech(
      request.user,
      generateTextToSpeechDto,
    );

    return { data };
  }

  @Post('images/generate')
  @HttpCode(200)
  async generateTextToImage(
    @Req() request: ExpressRequestType,
    @Body() generateImageDto: GenerateImageDto,
  ) {
    const data = await this.contentAiService.generateTextToImage(
      request.user,
      generateImageDto,
    );

    return { data };
  }
}
