import {TokensRepository} from "../../domain/push-notification/ports/tokens-repository";
import {admin} from "firebase-admin/lib/database";
import DataSnapshot = admin.database.DataSnapshot;
import {injectable} from "inversify";


@injectable()
export class FirebaseRepository implements TokensRepository {

  getListOfTokensForNotification(): Promise<string[]> {
    const admin = require("firebase-admin");
    const db = admin.database();
    const ref = db.ref("push/listDevices");

    return new Promise<string[]>((resolve, reject) => {
      ref.once("value", function (snapshot:DataSnapshot) {
        try {
          const tokens:string[] = [];
          snapshot.forEach(token => {
            tokens.push(token.key||'');
          })
          resolve(tokens);
        }catch (e) {
          reject(e);
        }
      });
    });
  }

}
