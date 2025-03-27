import express from "express"
const app = express()
const port = 5000
import Create from "./routes/create.js"
app.use('/api', Create);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
