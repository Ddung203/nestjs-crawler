import { ClsServiceManager } from "nestjs-cls";

export class ContextProvider {
  private static readonly nameSpace = "request";

  private static readonly authUserKey = "user_key";

  private static get<T>(key: string) {
    const store = ClsServiceManager.getClsService();

    return store.get<T>(ContextProvider.getKeyWithNamespace(key));
  }

  private static set(key: string, value: any): void {
    const store = ClsServiceManager.getClsService();

    store.set(ContextProvider.getKeyWithNamespace(key), value);
  }

  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.nameSpace}.${key}`;
  }

  static setAuthUser(user: any): void {
    ContextProvider.set(ContextProvider.authUserKey, user);
  }

  static getAuthUser() {
    return ContextProvider.get<any>(ContextProvider.authUserKey);
  }
}
