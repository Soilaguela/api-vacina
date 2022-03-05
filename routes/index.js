const user = require("./userRoutes");
const vacina = require("./vacinaRoutes");

// export the routes
module.exports = (app) => {
  app.use("/user", user);
  app.use("/vacina", vacina);
};