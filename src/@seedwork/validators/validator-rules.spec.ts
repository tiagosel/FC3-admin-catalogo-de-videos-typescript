import ValidationError from "../errors/validation-error";
import ValidatorRules from "./validator-rules";

describe("ValidatorRules unit teste", () => {
  test("Value Methods", () => {
    const validator = ValidatorRules.values("same value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("same value");
    expect(validator["property"]).toBe("field");
  });

  test("Required validation rule", () => {
    const error = new ValidationError("The field is required");

    let arrange: {value:any,property:string}[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];

    arrange.forEach((element) => {
      expect(() => {
        ValidatorRules.values(element.value, element.property).required();
      }).toThrow(error);
    });

    arrange = [
        { value: "teste", property: "field" },
        { value: 1, property: "field" },
        { value: false, property: "field" },
        { value: -1, property: "field" },
        { value: 5, property: "field" },
      ];

      arrange.forEach((element) => {
        expect(() => {
          ValidatorRules.values(element.value, element.property).required();
        }).not.toThrow(error);
      });
  });
});
