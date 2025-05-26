/*

Trying to create a rate limiter based on role 


*/

enum Capacity {
  'free' = 10,
  'standard' = 100,
  'premium' = 1000,
}

function rateLimiter(req: Request, res: Response) {
  const token = req.header('Authorization');

  const { userId, userRole } = fetchRole(token);

  const checkIfExits = fetchUserFromRedis(userId);

  if (checkIfExits) {
    if (Capacity[userRole] > fetchOverallRequest(userRole)) {
      updateRedis(userRole, 60000);
      next();
    }
  } else {
    res.status(403).send('Too may request');
  }
}
