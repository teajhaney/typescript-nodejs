import cors from 'cors';

const corfigureCors = () => {
  return cors({
    //origin-> tells which origin you user to access your api from
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000', //local development
        'https://productiondomain.com',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); //true-> give permission so that req can be allowed
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Version'],

    exposedHeaders: ['Content-Range', 'X-Content-Range', 'X-Total-Count'],

    credentials: true, //enables support for cookies

    preflightContinue: false, //default is falsw which means cors will handle it

    maxAge: 600, //cache pre flight response for 10 mins(600 sec), helps to avoid options request multiple times

    optionsSuccessStatus: 200,
  });
};

export default corfigureCors;
