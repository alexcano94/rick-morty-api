import app from './server';

import config from './config';
const port = config.PORT || 8080;

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});