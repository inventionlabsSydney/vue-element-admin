import Mock from 'mockjs'
import Faker from 'faker'
const List = []
const count = 100

function RandomAlpha(length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
function RandomAlphaNumeric(length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function giveSku() {
  // generate the first three letters.
  return RandomAlpha(3) + '-' + RandomAlphaNumeric(5)
}

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    sku: giveSku(),
    name: Faker.commerce.productName,
    performance: '@integer(1, 5)',
    'status|1': ['instock', 'nostock', 'onsale', 'dormant', 'archived'],
    current_price: Faker.commerce.price(10, 1000, 2, '$'),
    market_price: Faker.commerce.price(10, 1000, 2, '$'),
    stock_on_hand: Faker.random.number()

  }))
}

export default [
  {
    url: '/products/list',
    type: 'get',
    response: config => {
      const { performance, status, name, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (status && item.status !== status) return false
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

