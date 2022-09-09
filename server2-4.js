import express from "express";
import cluster from "cluster";
import os from "os";
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
} else {
  app.get("/api/randoms/datos", (req, res) => {
    res.send("Server2-4");
  });

  app.listen(PORT, () => {
    console.log("Server listening port 3000");
  });
}
