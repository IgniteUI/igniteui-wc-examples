import { faker } from "@faker-js/faker/locale/en";

export type UserSimple = {
  id: string;
  username: string;
  email: string;
  subscribed: boolean;
};

export type ProductInfo = {
  id: string;
  name: string;
  price: number;
  sold: number;
  rating: number;
  total: number;
};

export function createProductInfo(): ProductInfo {
  const price = faker.number.float({ min: 50, max: 500, fractionDigits: 2 });
  const sold = faker.number.int({ min: 10, max: 100 });
  const total = Number.parseFloat((price * sold).toFixed(2));

  return {
    price,
    sold,
    total,
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1 })
  };
}

export function createUserSimple(): UserSimple {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    subscribed: faker.datatype.boolean()
  };
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  avatar: string;
  active: boolean;
  priority: "Low" | "Standard" | "High";
  satisfaction: number;
  registeredAt: Date;
};

export function createUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName,
    lastName
  });

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    age: faker.number.int({ min: 18, max: 90 }),
    email,
    avatar: faker.image.avatar(),
    active: faker.datatype.boolean(),
    priority: faker.helpers.arrayElement(["Low", "Standard", "High"]),
    satisfaction: faker.number.int({ min: 0, max: 5 }),
    registeredAt: faker.date.past()
  };
}
