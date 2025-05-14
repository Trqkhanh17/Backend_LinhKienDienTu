import { Request, Response } from "express";
import connection from "../config/database";
import { RowDataPacket } from "mysql2";

export const getOverallStats = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>(
            `SELECT 
                ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán,
                ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán,
                ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu 
            FROM Order_Details od 
            JOIN \`Order\` o ON od.order_id = o.order_id;`
        );

        if (result.length === 0) {
            return res
                .status(200)
                .json({ message: "Thống kê đơn hàng rỗng", statusCode: 404 });
        }
        return res.status(200).json({ data: result[0], statusCode: 200 });
    } catch (error) {
        console.log("Lỗi thống kê tổng quan: ", error);
        return res.status(500).json("Lỗi máy chủ nội bộ");
    }
};

export const getDailyStats = async (req: Request, res: Response) => {
    try {
        const { date } = req.body;
        if (!date) {
            return res.status(400).json({ message: "Vui lòng nhập ngày cần thống kê" });
        }
        
        const formatDate = (dateString:any) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        let queryDate = date ? date : formatDate(new Date()); 
        console.log(queryDate);
        
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(queryDate)) {
            return res.status(400).json({ message: "Ngày không hợp lệ. Vui lòng nhập theo định dạng YYYY-MM-DD." });
        }

        const [result] = await connection.query<RowDataPacket[]>(
            `SELECT 
            ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán, 
            ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán, 
            ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu 
            FROM Order_Details od JOIN \`Order\` o ON od.order_id = o.order_id 
            WHERE DATE(o.order_create) = DATE(?)
            AND MONTH(o.order_create) = MONTH(?)
            AND YEAR(o.order_create) = YEAR(?)`,[queryDate, queryDate, queryDate])
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Lỗi thống kê theo ngày: ", error);
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
};


export const getMonthlyStats = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>(
            `SELECT 
                DATE_FORMAT(o.order_create, '%Y-%m') AS Tháng,
                ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán,
                ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán,
                ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu 
            FROM Order_Details od 
            JOIN \`Order\` o ON od.order_id = o.order_id 
            GROUP BY DATE_FORMAT(o.order_create, '%Y-%m')
            ORDER BY DATE_FORMAT(o.order_create, '%Y-%m') DESC;`
        );

        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Lỗi thống kê theo tháng: ", error);
        return res.status(500).json("Lỗi máy chủ nội bộ");
    }
};

export const getYearlyStats = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>(
            `SELECT 
                YEAR(o.order_create) AS Năm,
                ROUND(SUM(CASE WHEN o.pay_status = 1 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Đã_Thanh_Toán,
                ROUND(SUM(CASE WHEN o.pay_status = 0 THEN od.detail_price * od.detail_quantity ELSE 0 END)) AS Chưa_Thanh_Toán,
                ROUND(SUM(od.detail_price * od.detail_quantity)) AS Tổng_Doanh_Thu 
            FROM Order_Details od 
            JOIN \`Order\` o ON od.order_id = o.order_id 
            GROUP BY YEAR(o.order_create)
            ORDER BY YEAR(o.order_create) DESC;`
        );

        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Lỗi thống kê theo năm: ", error);
        return res.status(500).json("Lỗi máy chủ nội bộ");
    }
};
