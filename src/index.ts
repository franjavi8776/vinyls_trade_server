import server from "./app";
import { sequelize } from "./db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});
