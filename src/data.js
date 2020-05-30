import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';

const getMovies = async (client, db, search) => {
  await client.auth.loginWithCredential(new AnonymousCredential());
  const movies = await db
    .collection('movies')
    .find(
      {
        $or: [
          { title: new RegExp(`${search}`, 'i') },
          { cast: new RegExp(`${search}`, 'i') },
          { released: new RegExp(`${search}`, 'i') },
          { plot: new RegExp(`${search}`, 'i') },
          { rated: new RegExp(`${search}`, 'i') },
          { directors: new RegExp(`${search}`, 'i') },
        ],
      },
      {
        projection: {
          title: 1,
          cast: {
            $reduce: {
              input: '$cast',
              initialValue: '',
              in: {
                $cond: [
                  { $eq: ['$$value', ''] },
                  { $concat: ['$$value', '$$this'] },
                  { $concat: ['$$value', ', ', '$$this'] },
                ],
              },
            },
          },
          released: 1,
          plot: 1,
          rated: 1,
          directors: {
            $reduce: {
              input: '$directors',
              initialValue: '',
              in: {
                $cond: [
                  { $eq: ['$$value', ''] },
                  { $concat: ['$$value', '$$this'] },
                  { $concat: ['$$value', ', ', '$$this'] },
                ],
              },
            },
          },
          imdb: '$imdb.rating',
          poster: 1,
        },
      }
    )
    .asArray();

  return movies;
};

export default getMovies;
