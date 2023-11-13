import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function insertTestData() {
  try {
    // Insert a user
    const user = await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        username: "dove",
        password: "test",
        addr1: "123 Main St",
        addr2: "Apt 4B",
        state: "NY",
        zip: "10001",
        roles: {
          create: [{ name: "Admin" }, { name: "User" }],
        },
      },
    });

    console.log("Inserted user:", user);

    // If you want to insert more roles for the user later on
    const additionalRole = await prisma.role.create({
      data: {
        name: "Editor",
        userId: user.id,
      },
    });

    console.log("Inserted additional role:", additionalRole);
  } catch (error) {
    console.error("Error inserting test data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertTestData();
