// src/index.ts
import app from './app'; // Import the fully loaded app from your factory
import config from './utils/config';

app.listen(config.PORT, () => {
    console.log(`Server running at port ${config.PORT}`);
});