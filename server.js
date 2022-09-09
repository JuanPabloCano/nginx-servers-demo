import express from "express";
import os from "os";
import cluster from "cluster";
import rutas from "./routes/index.js";
import compression from "compression";

const app = express();
app.use(compression());

const cpus = os.cpus();
const PORT = Number(process.argv[2]) || 3000;
const iscluster = process.argv[3] == "cluster";

if (iscluster && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);

    cluster.fork();
  });
} else {
  app.use("/", rutas);

  app.listen(PORT, () => {
    console.log("Server listening port 3000");
  });
}
