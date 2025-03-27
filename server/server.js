import express from "express"
const app = express()
const port = 3000
import Create from "./routes/create.js"
import Read from "./routes/read.js"
import Update from "./routes/update.js"
app.use('/api', Create);
// app.use('/api', Read);
app.use('/api', Update);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
