const sequelize = require("./config/db");
const User = require("./models/userModel");

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");

    await sequelize.sync({ alter: true });

    // Admin

    const [admin, adminCreated] = await User.findOrCreate({
      where: {
        username: "admin",
      },
      defaults: {
        fullName: "System Admin",
        username: "admin",
        email: "admin@agri.com",
        password: "Admin@123",
        role: "admin",
      },
    });

    if (adminCreated) {
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    // Manager

    const [manager, managerCreated] = await User.findOrCreate({
      where: {
        username: "manager",
      },
      defaults: {
        fullName: "Farm Manager",
        username: "manager",
        email: "manager@agri.com",
        password: "Manager@123",
        role: "manager",
      },
    });

    if (managerCreated) {
      console.log("Manager user created");
    } else {
      console.log("Manager user already exists");
    }

    console.log("Seed completed successfully");

    await sequelize.close();
  } catch (error) {
    console.error("Seed failed:");
    console.error(error);
  }
};

seedDatabase();