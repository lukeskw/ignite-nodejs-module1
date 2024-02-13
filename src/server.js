import http from 'node:http'

//commonjs => require
//es modules => import/export

// stateful - stateless -> save data on memory / do not save data on memory

const users = []

const server = http.createServer((request, response)=>{
  const { method, url } = request

  if(method === 'GET' && url === '/users'){
    return response.end(JSON.stringify(users))
  }
  if(method === 'POST' && url === '/users'){
    users.push({
      id: 1,
      name: 'John doe',
      email: 'johndoe@example.com'
    })
  }
  return response.end('ok')
})

server.listen(3333)