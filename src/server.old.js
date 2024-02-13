import http from 'node:http'

//commonjs => require
//es modules => import/export

// stateful - stateless -> save data on memory / do not save data on memory

// headers(on req and res) => metadata of each request

//http status codes => 200, 201, 400, 404, 500

const users = []

const server = http.createServer((request, response)=>{
  const { method, url } = request

  if(method === 'GET' && url === '/users'){
    return response
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }
  if(method === 'POST' && url === '/users'){
    users.push({
      id: 1,
      name: 'John doe',
      email: 'johndoe@example.com'
    })
    return response.writeHead(201).end('ok')
  }
  return response.writeHead(404).end()
})

server.listen(3333)