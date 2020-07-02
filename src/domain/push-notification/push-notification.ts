import {inject, injectable} from "inversify";
import {Message} from "./model/message";
import {TokensRepository} from "./ports/tokens-repository";
import {SendMessage} from "./ports/send-message";

export interface IPushNotification {
  sendMessage(message: Message): void;
}


@injectable()
export class PushNotification implements IPushNotification {

  constructor(
      @inject("TokensRepository") public tokensRepository: TokensRepository,
      @inject("SendMessage") public sender: SendMessage
  ) {
  }

  async sendMessage(message: Message) {
    const tokens: string[] = await this.tokensRepository.getListOfTokensForNotification();
    if(tokens.length===0) return "Não existem tokens para envio de mensagem"
    message.tokens = tokens;
    return await this.sender.send(message)
  }

}
