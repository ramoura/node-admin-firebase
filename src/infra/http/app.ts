import "reflect-metadata";
import * as bodyParser from 'body-parser';
import container from "./inversify.config";
import {InversifyExpressServer} from "inversify-express-utils";

import '../firebase/firebase.config'
import '../../web/push-notification-controller'

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});


export default server
