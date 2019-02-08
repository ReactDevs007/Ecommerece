import * as endpoints from './endpoints';

export default {
  [endpoints.userAuthorize]: {
    json: () => ({
      success: 'Ok'
    })
  },
  [endpoints.userUpdate]: {
    json: () => ({
      success: 'Ok'
    })
  },
  [endpoints.loginWithPin]: {
    json: () => ({
      success: 'Ok'
    })
  },
  [endpoints.specials]: {
    json: () => ([
      {
        url: 'https://google.com',
        src: 'https://picsum.photos/400/230?random'
      }, {
        url: 'https://google.com',
        src: 'https://picsum.photos/400/230?random'
      }, {
        url: 'https://google.com',
        src: 'https://picsum.photos/400/230?random'
      }
    ])
  }
};
