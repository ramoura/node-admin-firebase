import * as express from 'express';
import {controller, httpGet, httpPost, interfaces, queryParam, request, response} from "inversify-express-utils";
import {Message} from "../domain/push-notification/model/message";
import {inject} from "inversify";
import {PushNotification} from "../domain/push-notification/push-notification";

@controller("/push")
export class PushNotificationController implements interfaces.Controller {

  constructor(@inject("PushNotification") private pushNotification: PushNotification) {
    console.log(pushNotification)
  }

  @httpPost("/")
  public async index(@request() req: express.Request, @response() res: express.Response) {
    try {
      console.log('olaasdasd')
      var {message, title} = req.body;

      var pushMessage: Message = {title, message, tokens: []};

      const posts = await this.pushNotification.sendMessage(pushMessage);
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
