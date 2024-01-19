export class AuthorizationFailed extends Error {
  public name = "Authorization Failed Exception";
  public key = "AUTH_FAILED";
  constructor(message: string | undefined) {
    super(message);
  }
}
