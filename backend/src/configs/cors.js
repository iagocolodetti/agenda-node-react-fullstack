module.exports = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_ALLOWEDHEADERS,
  credentials: (/true/i).test(process.env.CORS_CREDENTIALS),
  exposedHeaders: process.env.CORS_EXPOSEDHEADERS,
  maxAge: Number(process.env.CORS_MAXAGE)
}