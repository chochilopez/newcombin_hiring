const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'HomePage',
        component: () => import('src/pages/HomePage.vue')
      },
      {
        path: '/contact',
        name: 'ContactPage',
        component: () => import('src/pages/ContactPage.vue')
      },
      {
        path: '/members',
        name: 'MembersPage',
        component: () => import('src/pages/MembersPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
