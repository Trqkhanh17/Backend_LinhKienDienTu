import { Request, Response } from "express";
import connection from "../config/database";
import { compare, genSalt, hash } from "bcrypt";
import {
  checkEmail,
  createToken,
  isValidName,
  verifyEmail,
  verifyPhoneNumber,
} from "../utils";
import { RowDataPacket } from "mysql2";
import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  try {
    const { acc_email, password } = req.body;

    if (!acc_email || !password) {
      return res
        .status(200)
        .json({ message: "Email or password is Require!!", statusCode: 400 });
    }

    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT *FROM Account WHERE acc_email = ?",
      [acc_email]
    );

    if (result.length === 0) {
      return res
        .status(200)
        .json({ message: "Account not found!", statusCode: 404 });
    }

    const resultAcc = result[0];
    const auth = await compare(password, resultAcc.password);

    if (!auth) {
      return res
        .status(200)
        .json({ message: "Password is incorrect!!", statusCode: 401 });
    }

    if (resultAcc.is_admin === 0) {
      const [checkBanned] = await connection.query<RowDataPacket[]>(
        "SELECT is_banned FROM Customer WHERE cus_email = ?",
        [acc_email]
      );

      const checkBannedResult = checkBanned[0];
      if (checkBanned.length > 0 && checkBannedResult.is_banned === 1) {
        return res
          .status(200)
          .json({ message: "Account is banned", statusCode: 403 });
      }
    }

    const token = createToken(acc_email, resultAcc.is_admin);

    res.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Login Successfully",
      token: token,
      role: resultAcc.is_admin,
    });
  } catch (error) {
    console.log("Get Staff Error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};
const signUpCustomer = async (req: Request, res: Response) => {
  try {
    const {
      acc_email,
      password,
      cus_name,
      cus_address,
      cus_phone,
      cus_birthday,
    } = req.body;
    const birthday = new Date(cus_birthday);
    const cus_create = new Date();
    const is_banned = 0;
    const is_admin = 0;
    if (
      !acc_email ||
      !password ||
      !cus_name ||
      !cus_address ||
      !cus_phone ||
      !cus_birthday
    ) {
      return res
        .status(200)
        .json({ message: "Missing required field!!!", statusCode: 400 });
    }

    if (!isValidName(cus_name)) {
      return res
        .status(200)
        .json({ message: "Name is invalid", statusCode: 401 });
    }
    if (new Date(birthday).getFullYear() >= new Date().getFullYear()) {
      return res
        .status(200)
        .json({ message: "Birthday is invalid", statusCode: 402 });
    }
    if (!verifyEmail(acc_email)) {
      return res
        .status(200)
        .json({ message: "Email is invalid", statusCode: 403 });
    }

    if (!verifyPhoneNumber(cus_phone)) {
      return res
        .status(200)
        .json({ message: "Phone is invalid", statusCode: 405 });
    }
    
    const resultCheckEmail = await checkEmail(acc_email);
    if (resultCheckEmail) {
      return res
        .status(200)
        .json({ message: "Email already exists", statusCode: 404 });
    }
    const salt = await genSalt();

    const hashPass = await hash(password, salt);

    await connection.execute(
      "INSERT INTO Account(acc_email,password,is_admin) values(?,?,?)",
      [acc_email, hashPass, is_admin]
    );
    await connection.execute(
      "INSERT INTO Customer(cus_name,cus_address,cus_birthday,cus_phone,cus_email,cus_create,is_banned) values(?,?,?,?,?,?,?)",
      [
        cus_name,
        cus_address,
        birthday,
        cus_phone,
        acc_email,
        cus_create,
        is_banned,
      ]
    );

    const role = 0;
    const token = createToken(acc_email, role);

    res.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    return res
      .status(201)
      .json({ message: "Reister Successfully", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const signUpStaff = async (req: Request, res: Response) => {
  try {
    const { acc_email, password, staff_name, staff_phone,comfirmPass } = req.body;
    const is_admin = 1;
    if(!acc_email || !password || !staff_name || !staff_phone){
      return res.status(200).json({message: "Vui lòng điền đầy đủ thông tin",statusCode: 400});
    }
    const resultCheckEmail = await checkEmail(acc_email);
    if (resultCheckEmail) {
      return res
        .status(200)
        .json({ message: "Email đã tồn tại", statusCode: 409 });
    }
    if (!verifyEmail(acc_email)) {
      return res
        .status(200)
        .json({ message: "Email không hợp lệ", statusCode: 402 });
    }
    if (!verifyPhoneNumber(staff_phone)) {
      return res
        .status(200)
        .json({ message: "Số điện thoại không hợp lệ", statusCode: 403 });
    }
    if (password !== comfirmPass) {
      return res
        .status(200)
        .json({ message: "Mật khẩu không khớp", statusCode: 404 });
    }
    const salt = await genSalt();
    const hashPass = await hash(password, salt);
    await connection.execute(
      "INSERT INTO Account(acc_email,password,is_admin) values(?,?,?)",
      [acc_email, hashPass, is_admin]
    );
    await connection.execute(
      "INSERT INTO Staff(staff_name,staff_phone,staff_email) values(?,?,?)",
      [staff_name, staff_phone, acc_email]
    );
    const token = createToken(acc_email, is_admin);
    return res
      .status(201)
      .json({ message: "Reister Successfully", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;

    if (auth === "" || !auth) {
      return res.status(200).json({ message: "", statusCode: 403 });
    }

    const token = auth.split(" ")[1];

    const user = jwt.verify(token, process.env.JWT_KEY + "") as JwtPayload;

    if (user.role === 0) {
      const [result] = await connection.query(
        "Select * from Customer Where cus_email = ?",
        [user.email]
      );
      return res.status(200).json({ data: result, statusCode: 200 });
    }

    const [result] = await connection.query(
      "Select * from Staff Where staff_email = ?",
      [user.email]
    );

    return res.status(200).json({ data: result, statusCode: 200 });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

export default {
  login,
  signUpCustomer,
  signUpStaff,
  getProfile,
};