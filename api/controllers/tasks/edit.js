import database from "../../database/connection.js";

const editTaskQuery = `
SELECT * FROM task WHERE id = $1 AND created_by = $2;
`;

const editQuery = `
UPDATE task
SET name = $1, is_completed = $2
WHERE id = $3 AND created_by = $4
`;

async function updateTask(req, res) {
  try {
    // update data from body
    const name = req.body.name;
    const isCompleted = req.body.is_completed;
    const taskId = req.params.id;
    const userId = req.user.id;

    //get default task from db
    const getTaskDb = await database.query(editTaskQuery, [taskId, userId]);
    const defaultTask = getTaskDb.rows[0];

    if (!defaultTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // update task
    const values = [
      name || defaultTask.name,
      isCompleted || defaultTask.is_completed,
      taskId,
      userId,
    ];
    const dbRes = await database.query(updateTask, values);

    if (dbRes.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const data = {
      message: `Task update id ${taskId} successfully`,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default updateTask;
