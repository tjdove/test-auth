import express from "express";
//Routers
import { userRouter } from "./routes/users";
import { autoRouter } from "./routes/autos";
import { jobRouter } from "./routes/jobs";
//Import from Database to test the whole interface
import { testConnection } from "./database";

//console.log("APP:Test1");
const app = express();
app.use(express.json());

//Need to test that the connection is valid:
try {
  //Ask Prisma to test our connection
  console.log("Connection Test Succeeded");
  testConnection();
} catch (error) {
  console.error("testConnection failed: " + error);
  process.exit();
}

//Tell the main app to add the routes for the UsersAPI calls
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/autos", autoRouter);

app.listen(8080, () => console.log("Example app listening on port 8080"));

// Better error handling. Gott Learn this:
// const id = 1;

// try {
//   await removeUser(id);
// } catch (error) {
//   if (error instanceof PrismaClientKnownRequestError) {
//     switch (error.code) {
//       case 'P2025': // Record not found
//         console.log('The User record to be removed does not exist.');
//         break;
//       default:
//         console.log('An unexpected error occurred while trying to remove the User record.');
//         break;
//     }
//   } else {
//     console.log('An unexpected error occurred while trying to remove the User record.');
//   }
// }

// app.use((err: any, req: any, res: any, next: any) => {
//   console.error("Error:" + err.stack);
//   res.status(500).send("Something broke!");
// });
