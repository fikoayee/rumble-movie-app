import jsonServer from "json-server";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.put("/recommendations/:id/accept", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const recommendations = router.db.get("recommendations");
  const recommendation = recommendations.find({ id: id }).value();

  if (recommendation) {
    recommendations.find({ id: id }).assign({ isAccepted: true }).write();

    res.status(200).json({
      success: true,
      message: "Recommendation accepted",
      data: recommendation,
    });
  } else {
    res
      .status(404)
      .json({ success: false, message: "Recommendation not found" });
  }
});

server.put("/recommendations/:id/reject", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const recommendations = router.db.get("recommendations");
  const recommendation = recommendations.find({ id: id }).value();

  if (recommendation) {
    recommendations.find({ id: id }).assign({ isAccepted: false }).write();

    res.status(200).json({
      success: true,
      message: "Recommendation rejected",
      data: recommendation,
    });
  } else {
    res
      .status(404)
      .json({ success: false, message: "Recommendation not found" });
  }
});

server.patch("/recommendations/reset-status", (req, res) => {
  const recommendations = router.db.get("recommendations");

  const updatedRecommendations = recommendations
    .map((item) => ({ ...item, isAccepted: null }))
    .value();

  router.db.set("recommendations", updatedRecommendations).write();

  res.status(200).json({
    success: true,
    message: "All recommendations have been reset",
    data: updatedRecommendations,
  });
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
