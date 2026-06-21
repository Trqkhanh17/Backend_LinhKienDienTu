# Backend Linh Kien Dien Tu

Backend Node.js/Express cho he thong linh kien dien tu. Du an dung TypeScript, Prisma ORM va MySQL.

## Tech Stack

- Node.js 24
- Express
- TypeScript
- Prisma 6
- MySQL 8
- Docker / Docker Compose
- Firebase Storage
- Nodemailer

## Cau Truc Chinh

```txt
routes/          dinh nghia API endpoint
controllers/     nhan req, goi service, tra res
services/        validate va xu ly nghiep vu
repositories/    thao tac database bang Prisma
models/          Prisma schema va cac model .prisma
config/          cau hinh Prisma/Firebase
middleware/      auth middleware
utils/           helper chung
```

Luồng xử lý:

```txt
Route -> Controller -> Service -> Repository -> Prisma -> MySQL
```

## Environment

Tao file `.env` tu file mau:

```bash
cp .env.example .env
```

Khi chay backend truc tiep tren may:

```env
DATABASE_URL="mysql://root_user:123456@localhost:3306/DBLinhKienDienTu"
```

Khi chay trong Docker Compose, service `api` se override thanh:

```env
DATABASE_URL="mysql://root_user:123456@mysql:3306/DBLinhKienDienTu"
```

Can dien them:

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

## Chay Bang Docker

Chay toan bo backend + MySQL:

```bash
docker compose up -d --build
```

Backend chay tai:

```txt
http://localhost:8000
```

Xem log API:

```bash
docker compose logs -f api
```

Xem log MySQL:

```bash
docker compose logs -f mysql
```

Dung container:

```bash
docker compose down
```

Dung va xoa luon du lieu database:

```bash
docker compose down -v
```

## Docker Hoat Dong Nhu The Nao

`docker-compose.yml` tao 2 service:

```txt
api    backend Express/Prisma
mysql  MySQL 8 database
```

`mysql` tao database:

```txt
DBLinhKienDienTu
```

voi user:

```txt
root_user / 123456
```

`migrate` doi `mysql` healthy roi dong bo schema:

```bash
npx prisma db push
```

`api` doi `migrate` chay xong roi start backend:

```bash
npm start
```

Trong Docker, backend ket noi database bang host `mysql`, khong phai `localhost`.

## Dockerfile

Dockerfile dung multi-stage build:

```txt
deps     npm ci
build    prisma generate + npm run build + prune dev deps
runtime  chay compiled JS bang node dist/bin/www.js
```

Runtime image:

- chi copy `dist`, `models`, `node_modules` production
- chay bang non-root user `appuser`
- co healthcheck HTTP
- khong dung `nodemon`

## Chay Local Khong Docker

Can co MySQL dang chay tren may hoac MySQL Docker map ra `localhost:3306`.

Cai dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Dong bo schema vao database:

```bash
npm run prisma:push
```

Chay dev:

```bash
npm run dev
```

## Prisma

Prisma schema nam trong thu muc:

```txt
models/
```

File chinh:

```txt
models/schema.prisma
```

Model rieng:

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

`prisma.config.ts` tro Prisma vao thu muc `models`:

```ts
schema: "models"
```

Lenh hay dung:

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:migrate
npx prisma validate
```

Ghi chu:

- Development co the dung `prisma db push`.
- Production/CI-CD nen dung migration that: `prisma migrate deploy`.

## Scripts

```bash
npm run dev              # chay dev bang nodemon
npm run typecheck        # kiem tra TypeScript, khong emit JS
npm run build            # build TypeScript ra dist/
npm start                # chay production tu dist/bin/www.js
npm run prisma:generate  # generate Prisma Client
npm run prisma:push      # push schema vao DB
npm run prisma:migrate   # deploy migrations
```

## CI/CD Notes

Docker image co the build khong can `DATABASE_URL` that:

```bash
docker compose build api
```

Khi deploy production nen:

```bash
npx prisma migrate deploy
npm start
```

Khong nen dung `nodemon` hoac `ts-node` trong production container.

## API Prefix

Tat ca route duoc gan prefix:

```txt
/api/v1
```

Vi du:

```txt
GET /api/v1/category/list-all
GET /api/v1/product/list-all
POST /api/v1/login
```
