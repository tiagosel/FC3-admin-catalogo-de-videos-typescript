import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";
describe("UniqueEntityId Unit Tests", (): void => {
  const validateSpyValidate = jest.spyOn(
    UniqueEntityId.prototype as any,
    "validate"
  );
  //Após cada teste limpa mock 
  beforeEach(() => {
    validateSpyValidate.mockClear();
  });
  it("should throw error when uuid is invalid", (): void => {
    //código para verificar se o método está sendo chamado
    //const validateSpy  = jest.spyOn(UniqueEntityId.prototype as any,'validate');
    //validateSpyValidate.mockClear();
    expect((): UniqueEntityId => new UniqueEntityId("Id fake")).toThrow(
      new InvalidUuidError()
    );
    //código para verificar se o método está sendo chamado
    expect(validateSpyValidate).toHaveBeenCalledTimes(1);
  });

  it("should accept a uuid passed in constructor", (): void => {
    const uuid = "5439eada-1be8-4975-88e6-e5339f9c9364";
    const vo: UniqueEntityId = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    //código para verificar se o método está sendo chamado
    expect(validateSpyValidate).toHaveBeenCalledTimes(1);
  });

  it("should accept no uuid passed in constructor", (): void => {
    

    const vo: UniqueEntityId = new UniqueEntityId();
    expect(uuidValidate(vo.id)).toBeTruthy;
    //código para verificar se o método está sendo chamado
    expect(validateSpyValidate).toHaveBeenCalledTimes(1);
  });
});
