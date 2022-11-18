import ValueObject from "../value-object";

class StubValueObject extends ValueObject<any> {}

describe("UniqueEntityId Unit Tests", (): void => {
  it("should set value", (): void => {
    let stub: StubValueObject = new StubValueObject("teste");
    expect(stub.value).toBe("teste");

    stub = new StubValueObject({ prop: "valor" });
    expect(stub.value).toStrictEqual({ prop: "valor" });
  });
});
