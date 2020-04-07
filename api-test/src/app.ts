import * as express from 'express'
import * as cookieParser from 'cookie-parser'

// Initialize new express instance
const app = express()
app.use(cookieParser())
app.use(express.json())
// This middleware increments a visit counter cookie
app.use((req, res, next) => {
  const visits = +req.cookies.visitNumber || 0
  res.cookie('visitNumber', visits + 1)
  next()
})

interface IUser {
  firstName: string
  lastName: string
  birth: number
}

function isUser(arg: any): arg is IUser {
  return (
    arg && arg.firstName && typeof arg.firstName == 'string' && arg.lastName && typeof arg.lastName == 'string' && arg.birth && typeof arg.birth == 'number'
  )
}

// Poor man's in-memory DB ;-)
const users: Array<IUser> = [
  {
    firstName: 'Kenneth',
    lastName: 'Thompson',
    birth: 1943,
  },
  {
    firstName: 'Brian',
    lastName: 'Kernighan',
    birth: 1942,
  },
]

app.get('/users', (_, res) => {
  res.json(users)
})

app.post('/users', (req, res) => {
  const user = req.body
  if (isUser(user)) {
    users.push(user)
    res.json(user)
  } else {
    res.status(400).send()
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
