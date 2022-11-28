import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import {validate as uuidValidate } from "uuid";


class StubValueObject extends Entity<{prop1:string,prop2:number}> {}

describe('Entity Unit Tests',()=>{

    it('Should set props and id',()=>{

        const arrange = {prop1:'prop1 value',prop2:10}
        const entity = new StubValueObject(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect(uuidValidate(entity.id)).toBeTruthy();
    });

    it('Should accept a valid uuid',()=>{
        const arrange = {prop1:'prop1 value',prop2:10}
        const uniqueEntityId =new UniqueEntityId()
        const entity = new StubValueObject(arrange,uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
        expect(uuidValidate(entity.id)).toBeTruthy();

    });

    it('Should convert to a JavaScript Object',()=>{
        const arrange = {prop1:'prop1 value',prop2:10}
        const entity = new StubValueObject(arrange);
        expect(entity.toJSON()).toStrictEqual({id:entity.id,...arrange});
    });
})