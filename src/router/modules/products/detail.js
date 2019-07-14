import Layout from '@/layout'

const ProductDetail = {
  path: '/inventory/products/:pid',
  component: Layout,
  name: 'ProductDetail',
  hidden: true,
  children: [
    {
      path: '/inventory/products/:pid',
      component: () => import('@/views/products/product/detail'),
      name: 'Product',
      meta: { title: 'ProductName' }
    }
  ]
}

export default ProductDetail
