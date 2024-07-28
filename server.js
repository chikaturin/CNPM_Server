const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./Data/DB.js");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api", require("./Route/KhachHangRoute.js"));
app.use("/api", require("./Route/ListAirPlanRoute.js"));
app.use("/api", require("./Route/PhuongTienRoute.js"));
app.use("/api", require("./Route/TramDungRoute.js"));
app.use("/api", require("./Route/TuyenRoute.js"));
app.use("/api", require("./Route/DetailCarRoute.js"));
app.use("/api", require("./Route/SearchRoute.js"));
app.use("/api", require("./Route/AppraiseCarRoute.js"));
app.use("/api", require("./Route/AppraiseBusRoute.js"));
app.use("/api", require("./Route/BuyTicketTrainRoute.js"));
app.use("/api", require("./Route/BuyTicketBusRoute.js"));
app.use("/api", require("./Route/BookingCarRoute.js"));
app.use("/api", require("./Route/HistoryCar.js"));
app.use("/api", require("./Route/HistoryBusRoute.js"));
app.use("/api", require("./Route/HistoryTrainRoute.js"));
app.use("/api", require("./Route/UpdateStateRouter.js"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const session = require("express-session");
