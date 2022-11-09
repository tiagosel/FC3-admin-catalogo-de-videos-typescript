import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid.error";

export default class UniqueEntityid {
  constructor(public readonly id?: string) {
    this.id = id || uuidV4();
    const isValid: boolean = this.validate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
  private validate(id: string): boolean {
    return uuidValidate(this.id);
  }

}
