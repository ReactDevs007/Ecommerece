import { v1 } from 'uuid'

export const userInfo = {
  success: {
    name: 'Georgy',
    lastname: 'Mishin',
    sureName: 'Michaelovich',
    birthday: '19. 02. 1998',
    phone: '+7 (213) 123 12 31',
  },
}

export const bonuses = {
  success: { bonus: 30 },
}

export const catalog = {
  success: {
    catalog: [
      {
        id: 'asdasd',
        title: 'Catalog element 1',
        description: 'description',
        filters: [1, 2, 3, 4, 5, 6],
      },
      {
        id: 'asdas',
        title: 'Catalog element 2',
        description: 'description 3',
        filters: [1, 2, 3, 4, 5, 6],
      },
      {
        id: 'asdkljsadjl',
        title: 'Catalog element 4',
        description: 'description',
        filters: [1, 2, 3, 4, 5, 6],
      },
      {
        id: '3981',
        title: 'Catalog element 5',
        description: 'description',
        filters: [1, 2, 3, 4, 5, 6],
      },
      {
        id: 'xzxz',
        title: 'Catalog element 6',
        description: 'description',
        filters: [1, 2, 3, 4, 5, 6],
      },
    ],
  },
}

export const productsForCatalog = {
  success: {
    products: [
      {
        id: 'dasda',
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: ';kldf',
        image: null,
        title: 'Роза',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: '309',
        image: null,
        title: 'Кактус',
        price: '3500.000',
        discount: '2100.000',
      },
    ],
  },
}

export const product = {
  success: {
    id: 'sdfds',
    title: 'Букет "Летнее настроение"',
    width: 24,
    height: 36,
    price: '3250.000',
    discount: '1780.000',
    inStock: true,
    description:
      'Сезонный букет, собранный нами к 1 сентября. Актуален не только для школьников и их учителей, но и для любителей осени.',
    params: [
      { title: 'Хризантема кустовая', data: 5 },
      { title: 'Ветка мимозы ранней', data: 3 },
      { title: 'Тыква декоративная', data: 2 },
      { title: 'Бумага крафт', data: 1 },
      { title: 'Хризантема кустовая', data: 6 },
    ],
  },
}

export const filters = {
  success: {
    filters: [
      {
        title: 'Тип букета',
        params: [
          {
            id: 1,
            title: 'Букетный',
          },
          {
            id: 2,
            title: 'Цветочный',
          },
          {
            id: 3,
            title: 'Красивый',
          },
        ],
      },
      {
        title: 'Цвет',
        params: [
          {
            id: 4,
            title: 'Букетный',
          },
          {
            id: 5,
            title: 'Цветочный',
          },
          {
            id: 6,
            title: 'Красивый',
          },
        ],
      },
      {
        title: 'Вид цветов',
        params: [
          {
            id: 7,
            title: 'Букетный',
          },
          {
            id: 8,
            title: 'Цветочный',
          },
          {
            id: 9,
            title: 'Красивый',
          },
        ],
      },
      {
        title: 'Ещё пункт',
        params: [
          {
            id: 10,
            title: 'Букетный',
          },
          {
            id: 11,
            title: 'Цветочный',
          },
          {
            id: 12,
            title: 'Красивый',
          },
        ],
      },
    ],
  },
}

export const filteredProducts = {
  success: {
    total: 40,
    products: [
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
      {
        id: v1(),
        image: null,
        title: 'Цветок',
        price: '3500.000',
        discount: '2100.000',
      },
    ],
  },
}

export const order = {
  success: {
    goods: [
      { id: 1, title: 'Товар', price: 2100, discount: 1200 },
      { id: 2, title: 'Товар 1', price: 1400, discount: 850 },
      { id: 3, title: 'Товар 2', price: 320 },
      { id: 4, title: 'Товар 3', price: 4860, discount: 1100 },
    ],
    additionals: [
      {
        id: 5,
        title: 'Предложение',
        type: 'postcard',
        price: 150,
        discount: 80,
      },
      {
        id: 6,
        title: 'Предложение 1',
        type: 'order',
        price: 490,
      },
    ],
  },
}

export const shops = {
  success: {
    shops: [
      {
        id: 1,
        lat: 30,
        lon: 29,
        title: 'Магазин 1',
        phone: '8 (800) 300-20-23',
        address: 'г. Москва, Улица 12',
        workHours: {
          holidays: 'Выходной',
          weekdays: '09:00 - 18:00',
        },
      },
      {
        id: 2,
        lat: 31,
        lon: 34,
        title: 'Магазин 2',
        phone: '8 (800) 300-20-23',
        address: 'г. Москва, Улица 12',
        workHours: {
          holidays: 'Выходной',
          weekdays: '09:00 - 18:00',
        },
      },
      {
        id: 3,
        lat: 42,
        lon: 21,
        title: 'Магазин 3',
        phone: '8 (800) 300-20-23',
        address: 'г. Москва, Улица 12',
        workHours: {
          holidays: 'Выходной',
          weekdays: '09:00 - 18:00',
        },
      },
      {
        id: 4,
        lat: 11,
        lon: 27,
        title: 'Магазин 4',
        phone: '8 (800) 300-20-23',
        address: 'г. Москва, Улица 12',
      },
    ],
  },
}

export const avalivableTime = {
  success: { time: ['9:00 - 13:00', '13:00 - 16:00', '16:00 - 20:00'] },
}
