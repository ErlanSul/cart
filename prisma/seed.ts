import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Добавление пользователей
  const password = await bcrypt.hash('yourpassword', 10);
  const users = [
    { name: 'Alice', email: 'alice@example.com', password: password },
    { name: 'Bob', email: 'bob@example.com', password: password },
    { name: 'Carol', email: 'carol@example.com', password: password },
    { name: 'Dave', email: 'dave@example.com', password: password },
    { name: 'Eve', email: 'eve@example.com', password: password },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  // Добавление продуктов
  const products = [];
  for (let i = 1; i <= 30; i++) {
    products.push({
      name: `Product ${i}`,
      price: Math.random() * 100,
    });
  }

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
