import database from "../database/connection.js";

const createNewClientSQL = `
CREATE TABLE IF NOT EXISTS users (
id serial PRIMARY KEY,
username varchar(255) UNIQUE,
email varchar(255) UNIQUE,
password varchar(255),
created_at timestamp DEFAULT NOW()
);
`;

async function createClientsTable() {
  try {
    await database.query(createNewClientSQL);
  } catch (error) {
    return console.log("Error creating client table", error);
  }
}

export default createClientsTable;
