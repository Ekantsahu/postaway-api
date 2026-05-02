export const loggerMiddleware = (req, res, next) => {
  // Skip user routes
  if (req.originalUrl.includes("/api/signup") || req.originalUrl.includes("/api/signin")) {
    return next();
  }

  console.log("----- REQUEST LOG -----");
  console.log({
    time: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    body: req.body || {},
  });
  console.log("-----------------------");

  next();
};