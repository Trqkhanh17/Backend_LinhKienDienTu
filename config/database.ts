import mysql from "mysql2/promise";
import "dotenv/config";

const connection = mysql.createPool({
  host: process.env.DB_HOST || "localhost", 
  port: parseInt(`${process.env.DB_PORT}`) || 3307,
  database: process.env.DB_NAME || "DBLinhKienDienTu",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
});
export default connection;
