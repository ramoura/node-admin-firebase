export interface TokensRepository {
  getListOfTokensForNotification():  Promise<string[]>;
}

