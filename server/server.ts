import app, { httpServer } from './index';

const port = process.env.PORT || '8000';

httpServer.listen(port);
console.log(`Server started at ${port}`);
