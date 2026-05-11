// src/index.ts
import app from './app';
import config from './utils/config';

app.listen(config.PORT,() => {
    console.log(`server running at port ${config.PORT}`)})
