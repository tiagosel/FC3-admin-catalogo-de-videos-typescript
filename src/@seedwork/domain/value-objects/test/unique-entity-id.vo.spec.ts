import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";
import InvalidUuidError from "../../../errors/invalid-uuid.error";
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

  it("should validator return false when uuid is invalid", (): void => {
    const uniqueEntityId: UniqueEntityId = new UniqueEntityId();
    //valida método privado
    expect(uniqueEntityId['validate']("Id fake")).toBeFalsy();
    //código para verificar se o método está sendo chamado
    expect(validateSpyValidate).toHaveBeenCalledTimes(2);
  });

  it("should validator return true when uuid is valid", (): void => {
    const uniqueEntityId: UniqueEntityId = new UniqueEntityId();
    //valida método privado
    expect(uniqueEntityId['validate']("5439eada-1be8-4975-88e6-e5339f9c9364")).toBeTruthy();
    //código para verificar se o método está sendo chamado
    expect(validateSpyValidate).toHaveBeenCalledTimes(2);
  });

  it("should accept a uuid passed in constructor", (): void => {
    const uuid = "5439eada-1be8-4975-88e6-e5339f9c9364";
    const vo: UniqueEntityId = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    //código para verificar se o método está sendo chamado
    expect(validateSpyValidate).toHaveBeenCalledTimes(1);
  });

  it("should accept no uuid passed in constructor", (): void => {
    const vo: UniqueEntityId = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy;
    //código para verificar se o método está sendo chamado
    expect(validateSpyValidate).toHaveBeenCalledTimes(1);
  });


});
