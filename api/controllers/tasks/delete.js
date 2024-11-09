import database from "../../database/connection.js";

const query = `
DELETE FROM task WHERE id = $1 AND created_by = $2
`;

async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const dbRes = await database.query(query, [taskId, userId]);
    if (dbRes.rowCount === 0) {
      return res.status(200).json({ error: "Task not found" });
    }
    const data = {
      message: `Task delete id ${taskId} successfully`,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default deleteTask;
