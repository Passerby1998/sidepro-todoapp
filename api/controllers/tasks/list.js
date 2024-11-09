import database from "../../database/connection.js";

const query = `
SELECT id, name, is_completed, created_at FROM task
WHERE created_by = $1;
`;

async function listTask(req, res) {
  try {
    const createdBy = req.user.id;
    const dbRes = await database.query(query, [createdBy]);
    const task = dbRes.rows;
    const data = {
      message: "Task listed successfully",
      data: task,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default listTask;
