const { httpServer } = require('./server/server');

httpServer.listen(8080, () => console.log('listening on 8080 http'));
