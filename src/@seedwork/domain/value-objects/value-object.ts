export default abstract class ValueObject<Value = any> {
  protected _value: Value;

  get value(): Value {
    return this._value;
  }

  constructor(value: Value) {
    this._value = value;
  }
}
