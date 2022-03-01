import { BackendController } from '../controllers';

const endpoints = {
    CARD_DISTRIBUTE: `/api/card-shuffle`,
}

const routes = (app) => {
    app.post(endpoints.CARD_DISTRIBUTE, BackendController.cardShuffle);
}

export default {
    routes,
    endpoints
};
