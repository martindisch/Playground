import * as express from 'express'
import { Application, Request, Response } from 'express'

// Create a new express application instance
const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
