import express from "express"
import mongoose from "mongoose"
const router = express.Router()

import CreateGoal from "../models/create.js";
let conn = mongoose.connect("mongodb://localhost:27017/Tasks");

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})

router.post('/create', async (req, res) => {
    let e = await CreateGoal.create({
      task:    "tanmay",
      isDone: false,
      deadline: "23 may"
    })
    console.log(e)


  res.render('index', { foo: 'FOO' });
})


// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

export default router

