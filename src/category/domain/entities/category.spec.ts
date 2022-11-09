import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import { validate as uuidValidate } from "uuid";
describe("Category Unit Tests", () => {
  test("constructor of category", () => {
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

  test("getter of name prop", (): void => {
    let category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
    category = new Category({ name: null });
    expect(category.name).toBeNull();
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


    type CategoryData = { props: CategoryProperties; id?: string };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: "dce352d4-12c0-4228-b099-315b66f03518" },
    ];

    data.forEach((i:CategoryData):void => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
    });
  
  });
});
