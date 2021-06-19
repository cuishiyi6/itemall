export class Result {
  //成功
  static success(data: any, message?: string) {
    return { code: 200, data, message };
  }
  //失败
  static fail(code: number, message?: string) {
    return { code, message };
  }
}
