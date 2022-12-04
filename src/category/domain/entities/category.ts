import ValidatorRules from "../../../@seedwork/validators/validator-rules";
import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";


export type CategoryProperties ={
   name: string,
   description?: string,
   is_active?: boolean,
   created_at?: Date
   
}
export class Category extends Entity<CategoryProperties> {
 
  constructor(public readonly props: CategoryProperties, id?:UniqueEntityId) {
    Category.validate({name:props.name,description:props.description});
    super(props,id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();

  }

  get name():string {
    return this.props.name;
  }



  get description():string {
    return this.props.description;
  }

  private set description(value:string){
    this.props.description = value ?? null

  }

  private set name(value:string){
    this.props.name = value ?? null

  }



  get is_active():boolean {
    return this.props.is_active;
  }

  private set is_active(value:boolean){
    this.props.is_active = value ?? true

  }

  get created_at():Date {
    return this.props.created_at;
  }

  public update(name:string,description:string):void{
    Category.validate({name:name,description:description});
    this.name = name;
    this.description = description;
  }

   static validate(props:Omit<CategoryProperties,'created_at'>){
    ValidatorRules.values(props.name,"name").required().string();
    ValidatorRules.values(props.description,"description").string();
    ValidatorRules.values(props.is_active,"is_active").boolean();
  }
  public activate():void{
    this.props.is_active = true;
  }
  public deactivate():void{
    this.props.is_active = false;
  }

  
}

