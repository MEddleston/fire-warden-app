const sql = require("mssql");

const dbConfig = {
  user: "admin-michael",
  password: "CodyMA020120!!",
  server: "firewarden-server.database.windows.net",
  database: "FireWardenDB",
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};

module.exports = dbConfig;
