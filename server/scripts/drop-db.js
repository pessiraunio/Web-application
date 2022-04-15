import pgtools from 'pgtools'

const config = {
  user: 'user',
  host: '127.0.0.1',
  password: 'password',
  port: 5432
}

pgtools.dropdb(config, 'plans', (err, res) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log(res)
})
