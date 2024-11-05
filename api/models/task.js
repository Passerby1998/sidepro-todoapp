import database from "../database/connection";

const createTaskTableSQL = `
CREATE TABLE IF NOT EXISTS task (
    id serial PRIMARY KEY,
    name varchar(255)
    is_completed boolean DEFAULT false,
    created_by integer REFERENCES users(id),
    created_at timestamp DEFAULT NOW()
    );
    `;

async function createTaskTable() {
  try {
    await database.query(createTaskTableSQL);
    console.log("Task table created");
  } catch (error) {
    return console.log("Error creating task table", error);
  }
}

export default createTaskTable;
