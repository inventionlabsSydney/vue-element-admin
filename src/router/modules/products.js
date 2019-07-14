/**
 * Component router for inventory services
 **/

import Layout from '@/layout'

const inventoryRouter = {
  path: '/inventory',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Inventory',
  meta: {
    title: 'Inventory',
    icon: 'list'
  },
  children: [
    {
      path: 'products',
      component: () => import('@/views/products/list'),
      name: 'ProductsList',
      meta: { title: 'Products' }
    },
    {
      path: 'connections',
      component: () => import('@/views/products/connections'),
      name: 'Connections',
      meta: {
        title: 'Connections',
        affix: false
      }
    }
  ]
}

export default inventoryRouter
