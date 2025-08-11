import rateLimit from 'express-rate-limit';

const createBasicRateLimiter = (maxReqquest, timeWindow) => {
  return rateLimit({
    windowMs: timeWindow,
    max: maxReqquest,
    // limit:100,
    // limitReached: true,
    message: 'Too many request, please try again later',
    standardHeaders: true, // Return rate limit info in the `Ratelimits-*` header
    legacyHeaders: false, //disable the `x-RateLimit-*` headers
  });
};

export default createBasicRateLimiter;
