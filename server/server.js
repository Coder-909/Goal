import express from "express"
import connectDB from "./config/db.js"
const app = express();
const port = 5000;
import router from "./routes/tasks-routes.js";

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',router);

app.get('/', (req, res) => {
  res.send('Welcome to home page!')
})

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})
