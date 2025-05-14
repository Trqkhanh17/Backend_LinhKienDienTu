import { log } from "console";
import connection from "../config/database";
import { RowDataPacket } from "mysql2";
import { Request, Response } from "express";
export const getAllStock = async (req: Request, res: Response) => {
    try {
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * from Stock"
        );
        if (result.length === 0) {
            return res
                .status(200)
                .json({ message: "List stock empty", statusCode: 404 });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Change Password Error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const createStock = async (req: Request, res: Response) => {
    try {
        const {staff_id,pro_id,stock_import}= req.body;
        if (!staff_id || !pro_id || !stock_import) {
            return res.status(400).json({
                message: "Staff id, product id, stock import is require",
                statusCode: 400,
            });
        }
        const stock_export = 0;
        const date_import = new Date();
        const stock_update = new Date();
        await connection.execute(
            "INSERT INTO Stock(staff_id,pro_id,stock_import,stock_export,date_import,stock_update) VALUES(?,?,?,?,?,?)",
            [staff_id,pro_id,stock_import,stock_export,date_import,stock_update]
        );
        return res.status(201).json({ message: "Create stock success", statusCode: 200 });
    } catch (error) {
        console.log("Create stock error: ", error);
        return res.status(500).json("Internal Server Error");
        
    }
};

export const updateStock = async (req: Request, res: Response) => {
    try {
        const {stock_id,staff_id,pro_id,stock_import} = req.body;
        if (!stock_id || !staff_id || !pro_id || !stock_import) {
            return res.status(400).json({
                message: "Stock id, staff id, product id, stock import, stock export is require",
                statusCode: 400,
            });
        }
        const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Stock WHERE stock_id = ?",[stock_id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "Stock not found",
                statusCode: 404,
            });
        }
        const quantity = result[0].stock_import + parseInt(stock_import);
        const stock_update = new Date();
        await connection.execute(
            "UPDATE Stock SET staff_id = ?,pro_id = ?,stock_import = ?,stock_update = ? WHERE stock_id = ?",
            [staff_id,pro_id,quantity,stock_update,stock_id]
        );
        return res.status(200).json({ message: "Update stock success", statusCode: 200 });
    } catch (error) {
        console.log("Update stock error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};

export const exportStock = async (req: Request, res: Response) => {
    try {
      const { pro_id, stock_export } = req.body;
  
      // Kiểm tra tính hợp lệ
      if (!pro_id || !stock_export || stock_export < 0) {
        return res.status(400).json({
          message: "Stock ID và số lượng xuất phải được cung cấp và không được âm",
          statusCode: 400,
        });
      }
  
      // Tìm kiếm kho hàng
      const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM Stock WHERE pro_id = ?", [pro_id]);
  
      if (result.length === 0) {
        return res.status(404).json({
          message: "Kho hàng không tồn tại",
          statusCode: 404,
        });
      }
  
      // Cập nhật kho hàng
      const quantity = result[0].stock_import - parseInt(stock_export);
      const quantity_export = result[0].stock_export + parseInt(stock_export);
  
      await connection.execute(
        "UPDATE Stock SET stock_import = ?, stock_export = ? WHERE pro_id = ?",
        [quantity, quantity_export, pro_id]
      );
  
      return res.status(200).json({ message: "Cập nhật kho hàng thành công", statusCode: 200 });
    } catch (error) {
      console.error("Lỗi cập nhật kho hàng:", error);
      return res.status(500).json({ message: "Lỗi máy chủ", statusCode: 500 });
    }
  };

export const deleteStock = async (req: Request, res: Response) => {
    try {
        const { stock_id } = req.body;
        if (!stock_id) {
            return res.status(400).json({
                message: "Stock id is require",
                statusCode: 400,
            });
        }
        await connection.execute(
            "DELETE FROM Stock WHERE stock_id = ?",
            [stock_id]
        );
        return res.status(200).json({ message: "Delete stock success", statusCode: 200 });
    } catch (error) {
        console.log("Delete stock error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};

export const findStock = async (req: Request, res: Response) => {
    try {
        const {pro_name} = req.body;
        if (!pro_name) {
            return res.status(400).json({
                message: "Stock id is require",
                statusCode: 400,
            });
        }
        const [resultPro] = await connection.query<RowDataPacket[]>("SELECT * FROM Product WHERE pro_name LIKE ?",[`${pro_name}%`]);
        if (resultPro.length === 0) {
            return res.status(404).json({
                message: "Stock not found",
                statusCode: 404,
            });
        }
        const pro_id = resultPro[0].pro_id;
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Stock WHERE pro_id = ?",
            [pro_id]    
        );
        if (result.length === 0) {
            return res.status(404).json({
                message: "Stock not found",
                statusCode: 404,
            });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Find stock error: ", error);
        return res.status(500).json("Internal Server Error");
    }
};
export const getStockByProId = async (req: Request, res: Response) => {
    try {
        const {proId} = req.params;
        if (!proId) {
            return res.status(400).json({
                message: "Product id is require",
                statusCode: 400,    
            });
        }
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Stock WHERE pro_id = ?",
            [proId]
        );
        if (result.length === 0) {
            return res.status(404).json({
                message: "Stock not found",
                statusCode: 404,
            });
        }
        return res.status(200).json({ data: result, statusCode: 200 });
    } catch (error) {
        console.log("Get stock by id error: ", error);
        return res.status(500).json("Internal Server Error");
        
    }
};