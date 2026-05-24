import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'
import { tools } from '../tools/registry'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { title: '码艺仿在线工具箱' },
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: () => import('../views/FeedbackView.vue'),
          meta: { title: '反馈与建议' },
        },
        {
          path: 'changelog',
          name: 'changelog',
          component: () => import('../views/ChangelogView.vue'),
          meta: { title: '更新日志' },
        },
        ...tools.map((tool) => ({
          path: tool.path.replace(/^\//, ''),
          name: tool.id,
          component: tool.component,
          meta: { title: tool.title },
        })),
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || '码艺仿在线工具箱'
  document.title = to.path === '/' ? '码艺仿在线工具箱' : `${title} · 码艺仿在线工具箱`
})

export default router
