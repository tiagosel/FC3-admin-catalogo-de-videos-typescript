import ValueObject from "../value-object";

class StubValueObject extends ValueObject<any> {}

describe("UniqueEntityId Unit Tests", (): void => {
  it("should set value", (): void => {
    let stub: StubValueObject = new StubValueObject("teste");
    expect(stub.value).toBe("teste");

    stub = new StubValueObject({ prop: "valor" });
    expect(stub.value).toStrictEqual({ prop: "valor" });
  });

  describe("should convert to a string", () => {
    const date = new Date();
    let arrange = [
      { received: "", expected: "" },
      { received: undefined, expected: "undefined" },
      { received: null, expected: "null" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      {
        received: { prop1: "value1" },
        expected: JSON.stringify({ prop1: "value1" }),
      },
    ];

    test.each(arrange)(
      "from $received to $expected",
      ({ received, expected }) => {
        const vo = new StubValueObject(received);
        //quando concatenado com uma string o metodo toString é chamado
        expect(vo + "").toBe(expected);
        //chamando direto o toString
        expect(vo.toString()).toBe(expected);

        //chamando to string e concatenado com string vazia
        expect(vo.toString()+"").toBe(expected);
      }
    );
  });
});
