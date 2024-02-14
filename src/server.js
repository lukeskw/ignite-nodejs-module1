import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { routes } from './routes.js'

//commonjs => require
//es modules => import/export

// stateful - stateless -> save data on memory / do not save data on memory

// headers(on req and res) => metadata of each request

//http status codes => 200, 201, 400, 404, 500


const server = http.createServer(async (request, response)=>{
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if(route){
    return route.handler(request, response)
  }

  return response.writeHead(404).end()
})

server.listen(3333)