# Electronics Components Backend

Node.js/Express backend for an electronics components system. The project uses TypeScript, Prisma ORM, MySQL, and Docker.

## Tech Stack

- Node.js 24
- Express
- TypeScript
- Prisma 6
- MySQL 8
- Docker / Docker Compose
- Firebase Storage
- Nodemailer

## Project Structure

```txt
routes/          API route definitions
controllers/     request/response layer
services/        validation and business logic
repositories/    database access through Prisma
models/          Prisma schema and model files
config/          Prisma/Firebase configuration
middleware/      authentication middleware
utils/           shared helpers
```

Request flow:

```txt
Route -> Controller -> Service -> Repository -> Prisma -> MySQL
```

## Environment

Create your `.env` file from the example:

```bash
cp .env.example .env
```

When running the backend directly on your machine:

```env
DATABASE_URL="mysql://root_user:123456@localhost:3306/DBLinhKienDienTu"
```

When running inside Docker Compose, the `api` and `migrate` services override the database host:

```env
DATABASE_URL="mysql://root_user:123456@mysql:3306/DBLinhKienDienTu"
```

You also need to provide:

```env
JWT_KEY="..."
EMAIL="..."
EMAIL_PASSWORD="..."
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="..."
VITE_FIREBASE_PROJECT_ID="..."
VITE_FIREBASE_STORAGE_BUCKET="..."
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="..."
```

## Run With Docker

Start the backend, migration job, and MySQL:

```bash
docker compose up -d --build
```

The backend will be available at:

```txt
http://localhost:8000
```

View API logs:

```bash
docker compose logs -f api
```

View MySQL logs:

```bash
docker compose logs -f mysql
```

Stop containers:

```bash
docker compose down
```

Stop containers and remove database data:

```bash
docker compose down -v
```

## How Docker Works Here

`docker-compose.yml` defines three services:

```txt
mysql    MySQL 8 database
migrate  Prisma schema synchronization job
api      Express/Prisma backend
```

The `mysql` service creates:

```txt
database: DBLinhKienDienTu
user:     root_user
password: 123456
```

The `migrate` service waits for MySQL to become healthy, then runs:

```bash
npx prisma db push
```

The `api` service waits for `migrate` to complete successfully, then starts:

```bash
npm start
```

Inside Docker, the backend connects to MySQL using the Compose service name `mysql`, not `localhost`.

## Dockerfile

The Dockerfile uses a multi-stage build:

```txt
deps     install dependencies with npm ci
build    generate Prisma Client, build TypeScript, prune dev dependencies
runtime  run compiled JavaScript with node dist/bin/www.js
```

The runtime image:

- copies only `dist`, `models`, production `node_modules`, and Prisma config
- runs as a non-root user
- includes an HTTP healthcheck
- does not use `nodemon` or `ts-node`

## Run Locally Without Docker

You need a running MySQL database on your machine, or a MySQL container mapped to `localhost:3306`.

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Synchronize schema to the database:

```bash
npm run prisma:push
```

Run the development server:

```bash
npm run dev
```

## Prisma

Prisma schema files are stored in:

```txt
models/
```

Main schema file:

```txt
models/schema.prisma
```

Model files:

```txt
models/account.prisma
models/category.prisma
models/customer.prisma
models/gallery.prisma
models/order.prisma
models/orderDetail.prisma
models/product.prisma
models/staff.prisma
models/stock.prisma
```

`prisma.config.ts` points Prisma to the `models` directory:

```ts
schema: "models"
```

Common Prisma commands:

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:migrate
npx prisma validate
```

Notes:

- Use `prisma db push` for local development or early schema iteration.
- Use real migrations and `prisma migrate deploy` for production/CI-CD.

## Scripts

```bash
npm run dev              # run the dev server with nodemon
npm run typecheck        # type-check TypeScript without emitting JS
npm run build            # build TypeScript into dist/
npm start                # run production build from dist/bin/www.js
npm run prisma:generate  # generate Prisma Client
npm run prisma:push      # push schema to the database
npm run prisma:migrate   # deploy Prisma migrations
```

## CI/CD Notes

The Docker image can be built without a real `DATABASE_URL`:

```bash
docker compose build api migrate
```

For production deployment, prefer:

```bash
npx prisma migrate deploy
npm start
```

Do not run `nodemon` or `ts-node` in the production container.

## API Prefix

All routes are mounted under:

```txt
/api/v1
```

Examples:

```txt
GET  /api/v1/category/list-all
GET  /api/v1/product/list-all
POST /api/v1/login
```
