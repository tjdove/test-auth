import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const auto1 = await prisma.auto.create({
    data: {
      plate: "XYZ123",
      make: "Toyota",
      model: "Corolla",
      color: "Blue",
      jobs: {
        create: [
          {
            type: "Oil",
            mileage: "5000",
            oilType: "Synthetic",
            notes: "Regular maintenance",
          },
          {
            type: "Brakes",
            mileage: "10000",
            oilType: "Synthetic",
            notes: "Brake pad replacement",
          },
        ],
      },
    },
  });

  const auto2 = await prisma.auto.create({
    data: {
      plate: "ABC456",
      make: "Honda",
      model: "Civic",
      color: "Red",
      jobs: {
        create: [
          {
            type: "Tire Repair",
            mileage: "15000",
            oilType: "Synthetic",
            notes: "Front left tire repair",
          },
        ],
      },
    },
  });

  const auto3 = await prisma.auto.create({
    data: {
      plate: "LMN789",
      make: "Ford",
      model: "Focus",
      color: "Black",
      // This auto initially has no jobs
    },
  });

  console.log({ auto1, auto2, auto3 });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
