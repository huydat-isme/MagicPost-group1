import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "magic_post",
    // port: 8889,
    user: "root",
    password: "1",
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}