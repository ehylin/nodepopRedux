import { getAdvert } from './selector';

describe('getTweet', () => {
  const advertId = '1';
  const adverts = [{ id: +advertId }];
  const state = { adverts: { data: adverts } };

  test('should return a tweet by advertId', () => {
    expect(getAdvert(advertId)(state)).toEqual(adverts[0]);
  });

  test('should not return any advert', () => {
    expect(getAdvert('2')(state)).toBeUndefined();
  });
});
