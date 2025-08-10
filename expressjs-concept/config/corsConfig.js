import cors from 'cors';

const corfigureCors = () => {
  return cors({
    //origin-> tells which origin you user to access your api from
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://productiondomain.com',
      ];
    },
  });
};
