import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

//commonjs => require
//es modules => import/export

// stateful - stateless -> save data on memory / do not save data on memory

// headers(on req and res) => metadata of each request

//http status codes => 200, 201, 400, 404, 500

const database = new Database()

const server = http.createServer(async (request, response)=>{
  const { method, url } = request

  await json(request, response)

  if(method === 'GET' && url === '/users'){
    const users = database.select('users')
    console.log(database.database)
    return response.end(JSON.stringify(users))
  }
  if(method === 'POST' && url === '/users'){

    const { name, email } = request.body

    const user = {
      id: 1,
      name,
      email,
    }
    database.insert('users', user)
    return response.writeHead(201).end('ok')
  }
  return response.writeHead(404).end()
})

server.listen(3333)