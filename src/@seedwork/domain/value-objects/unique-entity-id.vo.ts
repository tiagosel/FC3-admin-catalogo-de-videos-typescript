import InvalidUuidError from "../../errors/invalid-uuid.error";
import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(private readonly id?: string) {
    super(id || uuidV4());
    const isValid: boolean = this.validate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
  private validate(id: string): boolean {
    return uuidValidate(id);
  }
}
