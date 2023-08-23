import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Configuration,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  OpenAIApi,
} from 'openai';
import { ConfigService } from '@nestjs/config';

import { DEFAULT_MODEL_CHAT_GPT } from 'src/shared/constants';
import {
  VERSES_STYLES,
  VerseStyle,
} from 'src/shared/seeds-lists/verses-styles';
import {
  ChatGptMessagesDto,
  ChatRole,
  CreativeGenerateDto,
  ParaphraseGenerateDto,
  VerseGenerateDto,
} from '../dto';
import {
  CREATIVES_THEMES,
  CreativeTheme,
} from 'src/shared/seeds-lists/creatives-themes';
import {
  COPYWRITING_STYLES,
  CopywritingStyle,
} from 'src/shared/seeds-lists/copywriting-styles';

@Injectable()
export class ChatGptService {
  private readonly openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: configService.get('OPENAI_API_KEY'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async getChatGptAnswer(
    messages: ChatGptMessagesDto[],
  ): Promise<string | CreateChatCompletionResponse> {
    const params: CreateChatCompletionRequest = {
      model: DEFAULT_MODEL_CHAT_GPT,
      messages,
    };

    try {
      const response = await this.openai.createChatCompletion(params);

      const { data } = response;

      if (data.choices.length) {
        return data.choices[0].message.content;
      }

      return data;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async generateVerseChatGpt(verseGenerateDto: VerseGenerateDto) {
    const { stanzaCount, styleId, stanzaSize, theme } = verseGenerateDto;

    const style = this.getStyleById(VERSES_STYLES, styleId);

    //TODO: incorrect number of stanza's counts and sizes
    const content = `Write a poem about "${theme}" in the form of a ${style}, which will consist of only ${stanzaCount} verses of ${stanzaSize} lines in each verse`;
    //TODO: need more testing
    console.log(content);

    const messageToChat: ChatGptMessagesDto = { role: ChatRole.USER, content };

    return this.getChatGptAnswer([messageToChat]);
  }

  async generateCreativeChatGpt({ themeId }: CreativeGenerateDto) {
    const titleWithTheme = this.getThemeAndTitle(themeId);

    if (!titleWithTheme) {
      throw new BadRequestException('This theme does not exist');
    }

    const { title, theme } = titleWithTheme;

    //TODO: request to chatgpt depends on title and theme, and create a general request difficult enough
    const content = `Come up with a new "${title}" for ${theme}`;
    //TODO: need more testing
    console.log(content);

    const messageToChat: ChatGptMessagesDto = {
      role: ChatRole.USER,
      content,
    };

    return this.getChatGptAnswer([messageToChat]);
  }

  async generateParaphraseChatGpt({ text, styleId }: ParaphraseGenerateDto) {
    const style = this.getStyleById(COPYWRITING_STYLES, styleId);

    const content = `Please paraphrase this text in the ${style} copywriting style\n\"\n${text}\n\"`;

    const messageToChat: ChatGptMessagesDto = { role: ChatRole.USER, content };

    return this.getChatGptAnswer([messageToChat]);
  }

  getStyleById(array: CopywritingStyle[] | VerseStyle[], id: number) {
    const style = array.find(
      (e: CopywritingStyle | VerseStyle) => id === e.id,
    )?.style;

    if (!style) {
      throw new BadRequestException('This style does not exist');
    }

    return style;
  }

  getThemeAndTitle(themeId: number) {
    for (const [title, values] of Object.entries(CREATIVES_THEMES)) {
      const theme = values.find((e: CreativeTheme) => themeId === e.id)?.theme;
      if (theme && title) {
        return { title, theme };
      }
    }
  }
}
