import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import corfigureCors from './config/corsConfig.js';
import { requestLogger, addTimeStamp } from './middleware/custom.middleware.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
import { urlVersioning } from './middleware/apiVersioning.js';
import createBasicRateLimiter from './middleware/rateLimiting.js';
import itemRoutes from './routes/item.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

//express json middleware
app.use(corfigureCors());
app.use(requestLogger);
app.use(addTimeStamp);

//express middleware
app.use(express.json());
app.use(createBasicRateLimiter(100, 15 * 60 * 1000)); //100 request per 15 minutes

app.use(urlVersioning('v1'));
app.use('/api/v1', itemRoutes);

app.use(globalErrorHandler); //automatically use the global error

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
