

export const getAdverts = state => state.adverts.data;

export const getAdvert = advertId => state =>
getAdverts(state).find(advert => advert.id === Number(advertId));