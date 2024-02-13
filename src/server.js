import http from 'node:http'

//commonjs => require
//es modules => import/export

// stateful - stateless -> save data on memory / do not save data on memory

// headers(on req and res) => metadata of each request

//http status codes => 200, 201, 400, 404, 500

const users = []

const server = http.createServer(async (request, response)=>{
  const { method, url } = request

  const buffers = []

  for await (const chunk of request){
    buffers.push(chunk)
  }

  try{
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }

  if(method === 'GET' && url === '/users'){
    return response
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }
  if(method === 'POST' && url === '/users'){

    const { name, email } = request.body

    users.push({
      id: 1,
      name,
      email,
    })
    return response.writeHead(201).end('ok')
  }
  return response.writeHead(404).end()
})

server.listen(3333)