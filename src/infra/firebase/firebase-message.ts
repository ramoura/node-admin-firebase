import {injectable} from "inversify";
import {SendMessage} from "../../domain/push-notification/ports/send-message";
import admin from "firebase-admin";
import BatchResponse = admin.messaging.BatchResponse;
import {Message} from "../../domain/push-notification/model/message";


@injectable()
export class FirebaseMessage implements SendMessage {
  send(message: Message): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const admin = require("firebase-admin");

      var firebaseMessage = {
        data: {
          score: '850',
          time: '2:45',
        },
        notification: {
          title: message.title,
          body: message.message,
        },
        tokens: message.tokens
      };

      admin.messaging().sendMulticast(firebaseMessage)
          .then((response: BatchResponse) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response.successCount);
            console.log('Qtde error:', response.failureCount);
            resolve(JSON.stringify(response))
          }).catch((error:any)=>{reject(error)});
    })
  }

}
