require("dotenv").config();
import { VideoSchemaDTO } from "../dtos/video.dto";
const dbConn = require("../configs/db.config");

export class VideoQueries {
  private static MYSQL_DATABASE_NAME = process.env.MYSQL_DATABASE_NAME;
  private static MYSQL_TABLE_NAME = process.env.MYSQL_TABLE_NAME;

  public static VideoModelCreateQuery = async (data: typeof VideoSchemaDTO) => {
    try {
      await dbConn.query(
        `INSERT INTO ${this.MYSQL_DATABASE_NAME}.${this.MYSQL_TABLE_NAME} SET ?`,
        data
      );
    } catch (error: any) {
      console.error(
        `Error while inserting the MySQL Database: ${JSON.stringify(
          error?.message
        )}`
      );
    }
  };
  static output: any[];

  static setOutput = (rows: any) => {
    this.output = rows;
    // console.log(this.output);
  };

  public static VideoModelGetByAnyKeyInDescOrderQuery = async (
    sortByOrder: string,
    callback: any
  ) => {
    try {
      var query = await dbConn.query(
        `SELECT * FROM ${this.MYSQL_DATABASE_NAME}.${this.MYSQL_TABLE_NAME}`,
        (err: any, rows: any) => {
          this.setOutput(rows);
        }
      );
      return this.output;
    } catch (error: any) {
      console.error(
        `Error while inserting the MySQL Database: ${JSON.stringify(
          error?.message
        )}`
      );
    }
  };
  public static VideoModelGetByTitleOrDescriptionQuery = async (
    searchString: String,
    callback: any
  ) => {
    try {
      const SQL_QUERY = `SELECT * FROM  ${this.MYSQL_DATABASE_NAME}.${this.MYSQL_TABLE_NAME} WHERE (title LIKE '%${searchString}%') OR (description LIKE '%${searchString}%')`;

      var query = await dbConn.query(SQL_QUERY, (err: any, rows: any) => {
        this.setOutput(rows);
      });
      return this.output;
    } catch (error: any) {
      console.error(
        `Error while inserting the MySQL Database: ${JSON.stringify(
          error?.message
        )}`
      );
    }
  };
}

module.exports = VideoQueries;
