<template>
  <div class="post-preview">
    <div v-if="loading" class="loading">
      Loading post...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="post" class="post-content">
      <div class="post-info">
        <div class="tags" v-if="post.tags?.length">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <span class="date">{{ formatDate(post.created_at) }}</span>
        <span class="reading-time">{{ post.read_time }} min read</span>
      </div>
      <h1 class="title">{{ post.title }}</h1>
      <p class="summary">{{ post.summary }}</p>
      
      <div class="meta">
        <div class="author">
          <img v-if="post.author?.image" :src="post.author.image" :alt="post.author.name" class="author-image" />
          <span class="author-name">{{ post.author?.name }}</span>
        </div>
      </div>
      <div class="content" v-html="post.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { postService, type Post } from '../services/postService'

const route = useRoute()
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref('')

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const ensureValidUrl = (url: string) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

const processContent = (content: string) => {
  // Primeiro, processa os links
  let processedContent = content.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"([^>]*)>/g, (match, url, rest) => {
    return `<a href="${ensureValidUrl(url)}"${rest}>`
  })

  // Envolve o texto em parágrafos se não estiver já em tags HTML
  if (!processedContent.includes('<p>')) {
    processedContent = processedContent
      .split('\n\n') // Divide por linhas duplas
      .map(paragraph => paragraph.trim()) // Remove espaços extras
      .filter(paragraph => paragraph) // Remove parágrafos vazios
      .map(paragraph => `<p>${paragraph}</p>`) // Envolve cada parágrafo em tags <p>
      .join('\n')
  }

  return processedContent
}

onMounted(async () => {
  try {
    const postId = route.params.id as string
    post.value = await postService.getPost(postId)
    if (post.value) {
      post.value.content = processContent(post.value.content)
    }
  } catch (err) {
    error.value = 'Error loading post. Please try again.'
    console.error('Error loading post:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.post-preview {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
}

.cover-image {
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
}

.cover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.summary {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 500;
  color: #333;
}

.post-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap;
}

.content :deep(h1),
.content :deep(h2),
.content :deep(h3),
.content :deep(h4),
.content :deep(h5),
.content :deep(h6) {
  margin: 2rem 0 1rem;
  line-height: 1.3;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
}

.content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 2rem 0;
}

.content :deep(a) {
  color: #007bff;
  text-decoration: none;
  display: inline-block;
  margin: 0 0.25rem;
}

.content :deep(a:hover) {
  text-decoration: underline;
}

.content :deep(blockquote) {
  border-left: 4px solid #007bff;
  margin: 2rem 0;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-radius: 0 8px 8px 0;
}

.content :deep(code) {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
}

.content :deep(pre) {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 2rem 0;
}

.content :deep(pre code) {
  background: none;
  padding: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  border: none;
}

.tag {
  background: #e9ecef;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #666;
}
</style> 