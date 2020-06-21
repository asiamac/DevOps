module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  pgHost: process.env.PGHOST,
  pgUser: process.env.PGUSER,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD.trim(),
  pgPort: process.env.PGPORT,
  port: process.env.BACKEND_PORT
}
