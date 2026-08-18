const path = require("node:path");

const frontendDirectory = process.env.FRONTEND_DIR
  ? path.resolve(process.env.FRONTEND_DIR)
  : path.resolve(__dirname, "../gsm-fix-desk-main");

module.exports = {
  apps: [
    {
      name: "gsm-backend",
      cwd: __dirname,
      script: "dist/main.js",
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
    },
    {
      name: "gsm-frontend",
      cwd: frontendDirectory,
      script: ".output/server/index.mjs",
      interpreter: "node",
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "8081",
      },
    },
  ],
};
