import {Message} from "../model/message";

export interface SendMessage {
  send(message:Message):  Promise<string>;
}
