<template>
  <div class="post-editor">
    <div class="editor-header">
      <h1>{{ isEditing ? 'Edit Post' : 'New Post' }}</h1>
      <div class="actions">
        <button class="btn btn-secondary" @click="router.push('/admin/posts')">Cancel</button>
        <button v-if="isEditing" class="btn btn-danger" @click="deletePost">Delete</button>
        <button class="btn btn-primary" @click="savePost">Save Post</button>
      </div>
    </div>

    <div class="editor-form">
      <div class="form-group">
        <label>Cover Image</label>
        <input type="text" v-model="post.cover_image" placeholder="Enter cover image URL" />
        <div v-if="post.cover_image" class="image-preview">
          <img :src="post.cover_image" alt="Cover preview" />
        </div>
      </div>

      <div class="form-group">
        <label>Title</label>
        <input type="text" v-model="post.title" placeholder="Enter post title" />
      </div>

      <div class="form-group">
        <label>Slug</label>
        <input type="text" v-model="post.slug" placeholder="Enter post slug" />
      </div>

      <div class="form-group">
        <label>Summary</label>
        <textarea v-model="post.summary" placeholder="Enter post summary"></textarea>
      </div>

      <div class="form-group">
        <label>Content</label>
        <RichTextEditor v-model="post.content" />
      </div>

      <div class="form-group">
        <label>Category</label>
        <input type="text" v-model="post.category" placeholder="Enter post category" />
      </div>

      <div class="form-group">
        <label>Tags</label>
        <div class="tags-input">
          <input
            type="text"
            v-model="newTag"
            @keyup.enter="addTag"
            placeholder="Add a tag and press Enter"
          />
          <button @click="addTag" class="btn-tag">Add Tag</button>
        </div>
        <div class="tags-list">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
            <button @click="removeTag(tag)">&times;</button>
          </span>
        </div>
      </div>

      <div class="form-group">
        <label>Author Name</label>
        <input type="text" v-model="post.author.name" placeholder="Enter author name" />
      </div>

      <div class="form-group">
        <label>Author Image</label>
        <input type="text" v-model="post.author.image" placeholder="Enter author image URL" />
        <div v-if="post.author.image" class="image-preview">
          <img :src="post.author.image" alt="Author preview" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RichTextEditor from '../Editor/RichTextEditor.vue'
import { postService, type Post } from '../../services/postService'

const route = useRoute()
const router = useRouter()
const isEditing = ref(false)

const post = ref<Post>({
  title: '',
  summary: '',
  content: '',
  cover_image: '',
  tags: [],
  category: '',
  slug: '',
  author: {
    name: '',
    image: '',
    role: ''
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  read_time: 0
})

const newTag = ref('')

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true
    try {
      const fetchedPost = await postService.getPost(route.params.id as string)
      console.log('Fetched post:', fetchedPost)
      post.value = {
        ...fetchedPost,
        content: fetchedPost.content || '',
        tags: fetchedPost.tags || [],
        category: fetchedPost.category || '',
        author: {
          name: fetchedPost.author?.name || '',
          image: fetchedPost.author?.image || '',
          role: fetchedPost.author?.role || ''
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Error loading post. Please try again.')
    }
  }
})

const addTag = () => {
  if (newTag.value && !post.value.tags?.includes(newTag.value)) {
    post.value.tags?.push(newTag.value)
    newTag.value = ''
  }
}

const removeTag = (tag: string) => {
  post.value.tags = post.value.tags?.filter(t => t !== tag)
}

const savePost = async () => {
  try {
    // Validate required fields
    if (!post.value.title) {
      alert('Title is required')
      return
    }

    // Ensure content is not empty
    if (!post.value.content) {
      post.value.content = ' '
    }

    // Calculate read time
    if (post.value.content) {
      post.value.read_time = postService.calculateReadingTime(post.value.content)
    }

    console.log('Saving post:', post.value)
    console.log('Content length:', post.value.content?.length)

    if (isEditing.value && post.value.id) {
      await postService.updatePost(post.value.id, post.value)
    } else {
      await postService.createPost(post.value)
    }
    router.push('/admin/posts')
  } catch (error: any) {
    console.error('Error saving post:', error)
    if (error.response) {
      console.error('Error response:', error.response.data)
      alert(`Error saving post: ${error.response.data}`)
    } else {
      alert('Error saving post. Please try again.')
    }
  }
}

const deletePost = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      if (post.value.id) {
        await postService.deletePost(post.value.id)
        router.push('/admin/posts')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post. Please try again.')
    }
  }
}
</script>

<style scoped>
.post-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

input[type="text"],
textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  font-size: 1rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.image-preview {
  margin-top: 1rem;
  max-width: 300px;
}

.image-preview img {
  width: 100%;
  height: auto;
}

.tags-input {
  display: flex;
  gap: 0.5rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background: #e9ecef;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  line-height: 1;
}

.btn-tag {
  padding: 10px;
  cursor: pointer;
}

.tag button:hover {
  color: #dc3545;
}
</style> 