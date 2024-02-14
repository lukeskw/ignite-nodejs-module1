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

// major ways to the frontend send information
// Query parameters: http://localhost:3333/users?userId=1&name=Luke  -> userId=1 and name=Luke are the query params, stateful url. Used in filters, paginations, optional params
// Route parameters: http://localhost:3333/users/1 -> /1 is the Route param, used to identify a resource
// Request Body: used to send Form data, sent via HTTPS and are cryptographed

const server = http.createServer(async (request, response)=>{
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route){
    const routeParams = request.url.match(route.path)

    console.log(routeParams)

    return route.handler(request, response)
  }

  return response.writeHead(404).end()
})

server.listen(3333)