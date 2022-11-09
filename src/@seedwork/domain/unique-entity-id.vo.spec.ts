import { method } from "lodash";
import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityid from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";
describe("UniqueEntityId Unit Tests", ():void => {
    it("should throw error when uuid is invalid", ():void => {
        //código para verificar se o método está sendo chamado  
        const validateSpy  = jest.spyOn(UniqueEntityid.prototype as any,'validate');
        expect(():UniqueEntityid=>new UniqueEntityid("Id fake")).toThrow(new InvalidUuidError);
        expect(validateSpy).toHaveBeenCalled();

    });

    
    it("should accept a uuid passed in constructor", ():void => {
        //código para verificar se o método está sendo chamado  
        const validateSpy  = jest.spyOn(UniqueEntityid.prototype as any,'validate');
        const uuid = "5439eada-1be8-4975-88e6-e5339f9c9364";
        const vo:UniqueEntityid = new UniqueEntityid(uuid);
        expect(vo.id).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();

    });

    it("should accept no uuid passed in constructor", ():void => {
        //código para verificar se o método está sendo chamado  
        const validateSpy  = jest.spyOn(UniqueEntityid.prototype as any,'validate');
        const vo:UniqueEntityid = new UniqueEntityid();
        expect(uuidValidate(vo.id)).toBeTruthy
        expect(validateSpy).toHaveBeenCalled();

    });

});