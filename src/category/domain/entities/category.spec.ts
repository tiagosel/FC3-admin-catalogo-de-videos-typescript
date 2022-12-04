import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
describe("Category Unit Tests", ():void => {
  test("constructor of category", ():void => {
    let category = new Category({ name: "Movie" });
    let props: CategoryProperties = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    let created_at: Date = new Date(); //string
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });
  test("getter and setter of name prop", (): void => {
    let category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category['name'] = "New Movie"
    expect(category.name).toBe("New Movie");
  });
  test("getter and setter of description prop", (): void => {
    let category: Category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = "other description";
    expect(category.description).toBe("other description");
  });
  test("getter and setter of is_active prop", (): void => {
    let category: Category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();

    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();
  });
  test("getter of created_at prop", (): void => {
    let category = new Category({
      name: "Movie",
    });

    expect(category.created_at).toBeInstanceOf(Date);

    let created_at: Date = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.created_at).toBe(created_at);
  });
  test("if field id", (): void => {


    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i:CategoryData):void => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  
  });

  it('Should active category',()=>{
    const arrange = { name: "Movie",is_active:false } ;
    const category = new Category(arrange);
    expect(category.props.is_active).not.toBeTruthy();
    category.activate();
    expect(category.props.is_active).toBeTruthy();
  });
  it('Should deactivate category',()=>{
    const arrange = { name: "Movie",is_active:true } ;
    const category = new Category(arrange);
    expect(category.props.is_active).toBeTruthy();
    category.deactivate();
    expect(category.props.is_active).not.toBeTruthy();
  });
  it('should update category',()=>{
    const  date:Date = new Date();
    const arrange = { name: "Movie",is_active:true,description:"Movie Description" ,created_at:date} ;
    const arrangeNewValue = { name: "Movie Changed",is_active:true,description:"Movie Description Changed",created_at:date } ;
    const category = new Category(arrange);
    expect(category.props).toStrictEqual(arrange);
    category.update(arrangeNewValue.name,arrangeNewValue.description);
    expect(category.props).toStrictEqual(arrangeNewValue);
    expect(category.props.name).toBe(arrangeNewValue.name);
    expect(category.props.description).toBe(arrangeNewValue.description);

  });
});
