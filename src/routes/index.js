import backendRoutes from './backend.routes';

export function initRoutes(app) {
   app.get('/api', (req, res) => res.status(200).send({
      message: 'server is running!'
   }))

   backendRoutes.routes(app);

   app.all('*', (req, res) => res.boom.notFound());
}

export default {
   initRoutes
}