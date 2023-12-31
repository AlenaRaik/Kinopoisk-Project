import { KinopoinskAllUnofficial, SearchSmall } from "#ui/cards/card-props";

export const kinopoiskUnofficial = 'https://kinopoiskapiunofficial.tech/';
// export const X_API_KEY_Unofficial = 'f08acb7a-336b-47e7-82b9-651c3c8005ef';
export const X_API_KEY_Unofficial = '923b524c-efdb-4e68-b1ab-72bcf18be01c';

export const kinopoiskUrl = 'https://api.kinopoisk.dev/';
export const X_API_KEY = 'MTSWC3Z-7PJM5NZ-HQ43FVP-9HCPJXE';

export const kinopoiskApi = {

    getAllPosts: (page: number): Promise<KinopoinskAllUnofficial> => {
      return fetch(
        `${kinopoiskUnofficial}api/v2.2/films/collections?type=TOP_250_MOVIES&page=${page}`,
        {
          method: 'GET',
          headers: {
            'X-API-KEY': X_API_KEY_Unofficial,
            'Content-Type': 'application/json',
          },
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error('SERVER_ERROR');
        }
        return response.json();
      });
    },
  };

  export const kinopoiskBigApi = {
    getSelectedAllPosts: (
      kinopoiskId: number
    ): Promise<SearchSmall> => {
      return fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': X_API_KEY_Unofficial,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error('SERVER_ERROR');
        }
        return response.json();
      });
    },
};

  // export const kinopoiskBigApi = {
  //     getSelectedAllPosts: (
  //       kinopoiskId: number
  //     ): Promise<KinopoinskProps> => {
  //       return fetch(
  //         `https://api.kinopoisk.dev/v1.4/movie/${kinopoiskId}`, {
  //         method: 'GET',
  //         headers: {
  //           'accept': 'application/json',
  //           'X-API-KEY': X_API_KEY,
  //         },
  //       }).then((response) => {
  //         if (!response.ok) {
  //           throw new Error('SERVER_ERROR');
  //         }
  //         return response.json();
  //       });
  //     },
  // };