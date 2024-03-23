import express, { Request, Response } from "express";
import { Security } from "./securities.interface";
import { StatusCodes } from "http-status-codes";

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ekaterinasleptsova",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

export const userRouter = express.Router();

userRouter.get("/securities", async (_, res: Response) => {
  try {
    pool.query(
      "SELECT * FROM securities",
      (
        error: any,
        results: {
          rows: { json_data: Security }[];
        }
      ) => {
        if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        }

        return res
          .status(StatusCodes.OK)
          .json([
            ...results.rows.map(
              (row: { json_data: Security }) => row.json_data
            ),
          ]);
      }
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

userRouter.get("/securities/:symbol", async (req: Request, res: Response) => {
  try {
    pool.query(
      `select * from securities where json_data @> '{"ticker": "${req.params.symbol}"}'`,
      (
        error: any,
        results: {
          rows: { json_data: Security }[];
        }
      ) => {
        if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        }

        return res.status(StatusCodes.OK).json({
          ...results.rows?.[0]?.json_data,
        });
      }
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});
