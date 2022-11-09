import { method } from "lodash";
import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityid from "./unique-entity-id.vo";

describe("UniqueEntityId Unit Tests", ():void => {
    it("should throw error when uuid is invalid", ():void => {
        //código para verificar se o método está sendo chamado  
        const validateSpy  = jest.spyOn(UniqueEntityid.prototype as any,'validate');
        expect(():UniqueEntityid=>new UniqueEntityid("Id fake")).toThrow(new InvalidUuidError);
        expect(validateSpy).toHaveBeenCalled();

    });

});