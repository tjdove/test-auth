import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Create 3 Autos
  const autos = await prisma.auto.createMany({
    data: [
      {
        plate: "ABC123",
        make: "Honda",
        model: "Civic",
        color: "Red",
      },
      {
        plate: "DEF456",
        make: "Toyota",
        model: "Camry",
        color: "Blue",
      },
      {
        plate: "GHI789",
        make: "Ford",
        model: "F-150",
        color: "Black",
      },
    ],
  });

  // Create 2 Jobs for each Auto
  for (const auto of autos) {
    await prisma.job.createMany({
      data: [
        {
          type: "Oil Change",
          mileage: "10000",
          oilType: "Synthetic",
          autoId: auto.id,
        },
        {
          type: "Brakes",
          mileage: "20000",
          notes: "Front brakes need to be replaced",
          autoId: auto.id,
        },
      ],
    });
  }
}

seed();
