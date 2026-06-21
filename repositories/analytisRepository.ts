import prisma from "../config/prisma";

const getOverallStats = () =>
  prisma.$queryRaw`
    SELECT
      ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán,
      ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán,
      ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu
    FROM Order_Details od
    JOIN \`Order\` o ON od.order_id = o.order_id
  `;

const getDailyStats = (queryDate: string) =>
  prisma.$queryRaw`
    SELECT
      ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán,
      ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán,
      ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu
    FROM Order_Details od
    JOIN \`Order\` o ON od.order_id = o.order_id
    WHERE DATE(o.order_create) = DATE(${queryDate})
      AND MONTH(o.order_create) = MONTH(${queryDate})
      AND YEAR(o.order_create) = YEAR(${queryDate})
  `;

const getMonthlyStats = () =>
  prisma.$queryRaw`
    SELECT
      DATE_FORMAT(o.order_create, '%Y-%m') AS Tháng,
      ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán,
      ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán,
      ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu
    FROM Order_Details od
    JOIN \`Order\` o ON od.order_id = o.order_id
    GROUP BY DATE_FORMAT(o.order_create, '%Y-%m')
    ORDER BY DATE_FORMAT(o.order_create, '%Y-%m') DESC
  `;

const getYearlyStats = () =>
  prisma.$queryRaw`
    SELECT
      YEAR(o.order_create) AS Năm,
      ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán,
      ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán,
      ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu
    FROM Order_Details od
    JOIN \`Order\` o ON od.order_id = o.order_id
    GROUP BY YEAR(o.order_create)
    ORDER BY YEAR(o.order_create) DESC
  `;

export default {
  getDailyStats,
  getMonthlyStats,
  getOverallStats,
  getYearlyStats,
};
