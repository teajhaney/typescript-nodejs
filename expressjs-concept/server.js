import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import corfigureCors from './config/corsConfig.js';
import { requestLogger, addTimeStamp } from './middleware/customMiddleware.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
import { urlVersioning } from './middleware/apiVersioning.js';

const app = express();
const PORT = process.env.PORT || 3000;

//express json middleware
app.use(corfigureCors());
app.use(requestLogger);
app.use(addTimeStamp);

//express middleware
app.use(express.json());
app.use(globalErrorHandler); //automatically use the global error
app.use('api/v1', urlVersioning('v1'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
