//Execute: npx tsx ./server/database.ts
//   - Don't use ts-node
import { PrismaClient, User, Auto, Job, Prisma } from "@prisma/client";

console.log("DataBase:Test1");

const prisma = new PrismaClient();

export async function testConnection() {
  try {
    await prisma.user.findFirst();
    console.log("Database connection successful");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      //This might to remove this. not sure if I shoudl be returnjiong that Prisma error specifically. Maybe rethrow it? or just dont catch?
    }
    console.log("Database connection failed:", error);
    throw new Error();
  }
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      roles: true,
    },
  });
  return users;
}

export async function getUser(id: number): Promise<User | null> {
  const theUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      roles: true,
    },
  });
  return theUser;
}
export async function getUserAuth(
  username: string,
  password: string
): Promise<User | null> {
  const theUser = await prisma.user.findUnique({
    where: {
      username: username,
      password: password,
    },
    include: {
      roles: true,
    },
  });
  return theUser;
}

export async function updateUser(
  id: number,
  data: Prisma.UserUpdateInput
): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return updatedUser;
}

export async function createUser(user: Prisma.UserCreateInput) {
  try {
    const createdUser = await prisma.user.create({
      data: user,
    });
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function removeUser(id: number): Promise<void> {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

//Autos
export async function getAutoByPlate(plate: string): Promise<Auto | null> {
  const auto = await prisma.auto.findUnique({
    where: {
      plate: plate,
    },
    include: {
      jobs: true,
    },
  });
  return auto;
}

export async function updateAuto(
  id: number,
  data: Prisma.AutoUpdateInput
): Promise<Auto> {
  const updatedAuto = await prisma.auto.update({
    where: {
      id: id,
    },
    data,
  });
  return updatedAuto;
}

//Jobs
export async function removeJob(id: number): Promise<void> {
  await prisma.job.delete({
    where: {
      id,
    },
  });
}

export async function createJob(job: Prisma.JobCreateInput) {
  try {
    const createdJob = await prisma.job.create({
      data: job,
    });
    return createdJob;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
