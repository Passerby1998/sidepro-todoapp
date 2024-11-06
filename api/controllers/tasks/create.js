import database from "../../database/connection.js";

const query = `
INSERT INTO task (name, created_by)
VALUES ($1, $2)
RETURNING id, name, is_completed, created_by, created_at;
`;

async function createTask(req, res) {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    //req.user from middleware isAuth
    const createdBy = req.user.id;
    const values = [name, createdBy];

    const dbRes = await database.query(query, values);
    const task = dbRes.rows[0];
    const data = {
      message: "Task created successfully",
      data: task,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default createTask;
