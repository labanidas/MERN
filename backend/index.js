import express from "express";
const app = express();
import cors from "cors";
import  tasksRouter from './tasksRouter.js';

app.use(cors());
app.use(express.json());
app.use('/api', tasksRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

