import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Rahman Solihin",
        email: "rahman@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Roni Hermanto",
        email: "roni@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Angga Tejo",
        email: "angga@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
