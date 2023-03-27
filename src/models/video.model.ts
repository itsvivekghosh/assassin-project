require("dotenv").config();
import { VideoSchemaDTO } from "../dtos/video.dto";
const dbConn = require("../configs/db.config");

export class VideoQueries {
  private static MYSQL_DATABASE_NAME = process.env.MYSQL_DATABASE_NAME;
  private static MYSQL_TABLE_NAME = process.env.MYSQL_TABLE_NAME;

  /*
    Saving/Inserting the data in the database.
  */
  public static VideoModelCreateQuery = async (data: typeof VideoSchemaDTO) => {
    try {
      await dbConn.query(
        `INSERT INTO ${this.MYSQL_DATABASE_NAME}.${this.MYSQL_TABLE_NAME} SET ?`,
        data
      );
    } catch (error: any) {
      const errorMessage = `Error while inserting data in the MySQL Database: ${JSON.stringify(
        error?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }
  };

  /* 
    Fetching all the videos as per the search query and responding as the paginated response.
  */
  public static getVideosByAnyKeyQueryResponse = async (
    pageNumber: number,
    pageSize: number,
    sortByOrder: string,
    sortByKey: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let SQL_QUERY = `SELECT * FROM ${this.MYSQL_DATABASE_NAME}.${
          this.MYSQL_TABLE_NAME
        } as v INNER JOIN (SELECT id FROM ${this.MYSQL_DATABASE_NAME}.${
          this.MYSQL_TABLE_NAME
        } LIMIT ${
          (pageNumber - 1) * pageSize
        }, ${pageSize}) as v2 ON v.id = v2.id ORDER BY v.${sortByKey} ${sortByOrder};`;
        await dbConn.query(SQL_QUERY, (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      } catch (error: any) {
        const errorMessage = `Error while fetching data from the MySQL Database: ${JSON.stringify(
          error?.message
        )}`;
        console.error(errorMessage);
        return {
          status: "error",
          message: errorMessage,
        };
      }
    });
  };

  /*
    Query to get all the videos from Database, where the search query lies in Description or in Title. [FUZZY SEARCH like:
       A video with title `How to make tea?` should match for the search query `tea how`.
    ]
  */
  public static VideoModelGetByTitleOrDescriptionQuery = async (
    searchString: String,
    pageNumber: number,
    pageSize: number,
    sortByOrder: string,
    sortByKey: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const SQL_QUERY = `SELECT * from ${this.MYSQL_DATABASE_NAME}.${
          this.MYSQL_TABLE_NAME
        } as v3 INNER JOIN (SELECT v.id FROM ${this.MYSQL_DATABASE_NAME}.${
          this.MYSQL_TABLE_NAME
        } as v INNER JOIN (SELECT id from ${this.MYSQL_DATABASE_NAME}.${
          this.MYSQL_TABLE_NAME
        } WHERE MATCH(title, description) AGAINST("${searchString}" IN NATURAL LANGUAGE MODE)) as v2 ON v.id = v2.id ORDER BY v.id desc LIMIT ${
          (pageNumber - 1) * pageSize
        }, ${pageSize}) as v4 WHERE v4.id = v3.id ORDER BY v3.${sortByKey} ${sortByOrder};`;

        await dbConn.query(SQL_QUERY, (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      } catch (error: any) {
        const errorMessage = `Error while fetching data from the MySQL Database: ${JSON.stringify(
          error?.message
        )}`;
        console.error(errorMessage);
        return {
          status: "error",
          message: errorMessage,
        };
      }
    });
  };
}

module.exports = VideoQueries;
