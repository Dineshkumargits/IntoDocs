export class EntityNotFoundException extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "Entity Not Found";
  }
}
