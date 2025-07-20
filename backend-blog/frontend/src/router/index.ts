import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/Admin/PostList.vue'
import PostEditor from '../components/Admin/PostEditor.vue'
import PostPreview from '../components/PostPreview.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/admin',
      redirect: '/admin/posts'
    },
    {
      path: '/admin/posts',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/admin/posts/new',
      name: 'NewPost',
      component: PostEditor
    },
    {
      path: '/admin/posts/:id',
      name: 'EditPost',
      component: PostEditor
    },
    {
      path: '/preview/:id',
      name: 'PostPreview',
      component: PostPreview
    }
  ]
})

export default router 