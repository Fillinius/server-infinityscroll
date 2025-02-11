import express from 'express'
import chalk from 'chalk'
import { MOCK_DATA } from './mock/MOCK_DATA.js'
import cors from 'cors'

const PORT = 1808
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
  res.json(MOCK_DATA)
})

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port: ${PORT}`))
    })
  } catch (error) {
    console.logred(chalk.red(error.message))
  }
}
start()
