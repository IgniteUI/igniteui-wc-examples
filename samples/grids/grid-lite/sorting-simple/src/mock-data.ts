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
  const price = faker.datatype.number({ min: 50, max: 500, precision: 0.01 });
  const sold = faker.datatype.number({ min: 10, max: 100 });
  const total = Number.parseFloat((price * sold).toFixed(2));

  return {
    price,
    sold,
    total,
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 })
  };
}

export function createUserSimple(): UserSimple {
  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
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
  const firstName = faker.name.firstName(faker.name.sexType());
  const lastName = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName
  ]);

  return {
    id: faker.datatype.uuid(),
    firstName,
    lastName,
    age: faker.datatype.number({ min: 18, max: 90 }),
    email,
    avatar: faker.image.avatar(),
    active: faker.datatype.boolean(),
    priority: faker.helpers.arrayElement(["Low", "Standard", "High"]),
    satisfaction: faker.datatype.number({ min: 0, max: 5 }),
    registeredAt: faker.datatype.datetime()
  };
}
