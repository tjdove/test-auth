How this was built:

New Project:

npm create vite@latest

creates the base.

npm install

Addeed \*.env to the gitignore file
Added a .prettierignore file to prevent trouble with MD files.

git init
commit
create new github and push

git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:tjdove/shop-minder.git
git push -u origin main

Turn off linting of MD files:temp
markdownlint.toggleLinting

---

Tailwind setup

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

Make sure postcss.config.cts and tailwind.config.cts are .cts files.

---

main.tsx - Where render is called on the root from index.html. More like a launcher.

- ReactDOM.createRoot(document.getElementById('root')!).render(

App.ts - Root of the actual app.

- This is where post 6.4 router style starts
- const router = createBrowserRouter(
  createRoutesFromElements(

Put route objects in as elements:
<Route path="/" element={<RootLayout />}>
<Route index element={<Home />}></Route>
</Route>

---

Login
Home

---

main.tsx loads index.css and App.css

---

Use autocomplete attributes
Autocomplete attributes help password managers to infer the purpose of a field in a form, saving them from accidentally saving or autofilling the wrong data. A little annotation can go a long way: some common values for text fields are “username”, “current-password” (login forms and change password forms) and “new-password” (registration and change password forms). See a detailed write-up with examples.

Fields that are not passwords, but should be obscured, such as credit card numbers, may also have a type="password" attribute, but should contain the relevant autocomplete attribute, such as "cc-number" or "cc-csc".

## https://www.chromium.org/developers/design-documents/create-amazing-password-forms/

---

Install/init prisma, planetscale

Create schema in schema.prisma file.
@@map lets you remap the name of the field from the model name.
THis way I can reuse differnt user schema without name conflict in the same database.

- Planetscale only gives one free database. Gotta namespace it.

# Create a connection to the planetscale server.

Shell:
pscale shell devappserver main

(main is the branch)
// Leave it up and running while you develop.
pscale connect devappserver main --port 3309

---

prisma db pull - gets the current state of the database and merges it with existing schema.prisma file.

Drop tables manually. I do this just to make sure. I never override a warning from "db push".

//Runs schema.prisma which builds the tables out
npx prisma db push

//build client.
prisma generate

Dont forget to run GENERATE or the Prisma client code won't line up with the schema and havok occurs.

//Insert Test data and start API
npm run insertData
npm run startAPI

---

Now build out the API server.
Using Express and PrismaClient.

Seperated out the User calls into users.ts.

Need more complete erorr handling.

---

Got the API back in working state. Now pulling Users with roles.

Added this proxy setup to vite.config.ts

export default defineConfig({
plugins: [react()],
server: {
proxy: {
"/api": "http://127.0.0.1:8080",
},
},
});

Tells vite to redirect the port so avoiding CORS errors.

Had a nightmare with CORS errors.
Turns out you don't ever use the localhost:8080 when calling the APIs
The proxy will fix all of that. Believe in the vite proxy setup I have here.

---

Figure out favicon. Where it goes. I like them.

---

Figured out passing object parameters with TypeScript:Aqua-Minder

users.map((thisUser: User) => (
<UserDisplay user={thisUser} key={thisUser.id} />
))

export default function UserDisplay({ user }: { user: User }) {
}

yes you need all that mess to pass one user. Insane. There may be other ways but I had a nightmare with this too.

Living with it for now.

---

Authentication:
Using FireBase Auth
Built another app to figure this out. What a mess auth is.
