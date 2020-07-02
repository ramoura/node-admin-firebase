import {Container} from 'inversify';

import "./../../web/push-notification-controller";
import {PushNotification} from "../../domain/push-notification/push-notification";
import {TokensRepository} from "../../domain/push-notification/ports/tokens-repository";
import {FirebaseRepository} from "../firebase/firebase-repository";
import {FirebaseMessage} from "../firebase/firebase-message";

const container = new Container();

container.bind<FirebaseMessage>('SendMessage').to(FirebaseMessage);
container.bind<TokensRepository>('TokensRepository').to(FirebaseRepository);
container.bind<PushNotification>('PushNotification').to(PushNotification);

export default container;
