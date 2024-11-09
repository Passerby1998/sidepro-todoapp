import database from "../../database/connection.js";

const query = `
SELECT * FROM task WHERE id = $1 AND created_by = $2;
`;

async function viewTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const dbRes = await database.query(query, [taskId, userId]);
    const task = dbRes.rows[0];

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const data = {
      message: `Task viewed id ${taskId} successfully`,
      data: task,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default viewTask;
