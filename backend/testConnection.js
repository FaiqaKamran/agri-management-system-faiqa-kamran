const sequelize = require("./config/db");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error.message);
  } finally {
    await sequelize.close();
  }
}

testConnection();