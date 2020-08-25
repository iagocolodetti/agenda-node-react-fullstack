module.exports = {
  origin: '*',
  methods: 'POST, GET, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Authorization, Content-Type',
  credentials: true,
  exposedHeaders: 'Authorization',
  maxAge: 3600
}