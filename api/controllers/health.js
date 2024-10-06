function getHealth(req, res) {
  const data = {
    message: "clear",
  };
  res.status(200).json(data);
}

function postHealth(req, res) {
  const body = req.body;
  const data = {
    message: "clear",
    data: body,
  };
  res.status(200).json(data);
}

const healthController = {
  getHealth,
  postHealth,
};

export default healthController;
