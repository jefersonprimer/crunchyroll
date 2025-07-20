<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const editorRef = ref<HTMLElement | null>(null);
const showToolbar = ref(false);
const isToolbarOpen = ref(false);
const formatButtonRef = ref<HTMLElement | null>(null);
const formatToolbarRef = ref<HTMLElement | null>(null);
const showVideoInput = ref(false);
const videoInputPosition = ref({ top: 0, left: 0 });
const videoUrl = ref('');
const activeImageRef = ref<HTMLElement | null>(null);
const showImageControls = ref(false);
const imageControlsPosition = ref({ top: 0, left: 0 });

const insertImage = () => {
  if (editorRef.value) {
    const placeholder = `<span contenteditable="false" class="image-placeholder" onclick="this.contentEditable='true'; this.focus();">
      <input type="text" placeholder="Enter image URL" class="inline-image-input" />
    </span>`;
    insertAtCursor(placeholder);
    isToolbarOpen.value = false;

    setTimeout(() => {
      const input = document.querySelector('.inline-image-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const url = input.value;
            if (url) {
              const imgTag = `<p class="text-lg leading-relaxed my-6"><img src="${url}" alt="Inserted image" style="width: 400px; max-width: 100%; height: auto; border-radius: 8px;" /></p>`;
              const placeholder = input.closest('.image-placeholder');
              if (placeholder) {
                placeholder.outerHTML = imgTag;
                emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
              }
            }
          } else if (event.key === 'Escape') {
            const placeholder = input.closest('.image-placeholder');
            if (placeholder) {
              placeholder.remove();
              emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
            }
          }
        });
      }
    }, 0);
  }
};

const insertUnsplashImage = () => {
  if (editorRef.value) {
    const placeholder = `<span contenteditable="false" class="image-placeholder" onclick="this.contentEditable='true'; this.focus();">
      <input type="text" placeholder="Enter search term for Unsplash image" class="inline-image-input" />
    </span>`;
    insertAtCursor(placeholder);
    isToolbarOpen.value = false;

    setTimeout(() => {
      const input = document.querySelector('.inline-image-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const query = input.value;
            if (query) {
              const url = `https://source.unsplash.com/random/800x600/?${encodeURIComponent(query)}`;
              const imgTag = `<span contenteditable="true" class="editable-content"><img src="${url}" alt="${query}" style="width: 400px; max-width: 100%; height: auto;" /></span>`;
              const placeholder = input.closest('.image-placeholder');
              if (placeholder) {
                placeholder.outerHTML = imgTag;
                emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
              }
            }
          } else if (event.key === 'Escape') {
            const placeholder = input.closest('.image-placeholder');
            if (placeholder) {
              placeholder.remove();
              emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
            }
          }
        });
      }
    }, 0);
  }
};

const getEmbedUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId = '';
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get('v') || '';
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }
    
    // Dailymotion
    if (urlObj.hostname.includes('dailymotion.com')) {
      const videoId = urlObj.pathname.split('/').pop();
      if (videoId) {
        return `https://www.dailymotion.com/embed/video/${videoId}`;
      }
    }
    
    // Se não for nenhuma das plataformas suportadas, retorna null
    return null;
  } catch {
    return null;
  }
};

const insertVideo = () => {
  if (editorRef.value) {
    const placeholder = `<span contenteditable="false" class="video-placeholder" onclick="this.contentEditable='true'; this.focus();">
      <input type="text" placeholder="Enter YouTube, Vimeo, or Dailymotion URL" class="inline-video-input" />
    </span>`;
    insertAtCursor(placeholder);
    isToolbarOpen.value = false;

    setTimeout(() => {
      const input = document.querySelector('.inline-video-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const url = input.value;
            const embedUrl = getEmbedUrl(url);
            if (embedUrl) {
              const videoTag = `<p class="text-lg leading-relaxed my-6">
                <div class="video-wrapper" style="max-width: 100%; border-radius: 8px;">
                  <iframe 
                    src="${embedUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="width: 100%; height: 100%; border-radius: 8px;"
                  ></iframe>
                </div>
              </p>`;
              const placeholder = input.closest('.video-placeholder');
              if (placeholder) {
                placeholder.outerHTML = videoTag;
                emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
              }
            } else {
              alert('Please enter a valid YouTube, Vimeo, or Dailymotion URL');
            }
          } else if (event.key === 'Escape') {
            const placeholder = input.closest('.video-placeholder');
            if (placeholder) {
              placeholder.remove();
              emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
            }
          }
        });
      }
    }, 0);
  }
};

const insertEmbed = () => {
  const url = prompt('Enter embed URL:');
  if (url) {
    const embedTag = `<span contenteditable="true" class="editable-content"><iframe src="${url}" style="width: 100%; height: 400px; border: none;"></iframe></span>`;
    insertAtCursor(embedTag);
    isToolbarOpen.value = false;
  }
};

const insertCodeBlock = () => {
  if (editorRef.value) {
    const placeholder = `<span contenteditable="false" class="code-placeholder" onclick="this.contentEditable='true'; this.focus();">
      <textarea placeholder="Enter your code here" class="inline-code-input"></textarea>
    </span>`;
    insertAtCursor(placeholder);
    isToolbarOpen.value = false;

    setTimeout(() => {
      const textarea = document.querySelector('.inline-code-input') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        textarea.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' && event.ctrlKey) {
            const code = textarea.value;
            if (code) {
              const codeTag = `<div class="code-block">
                <pre><code>${code}</code></pre>
              </div>`;
              const placeholder = textarea.closest('.code-placeholder');
              if (placeholder) {
                placeholder.outerHTML = codeTag;
                emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
              }
            }
          } else if (event.key === 'Escape') {
            const placeholder = textarea.closest('.code-placeholder');
            if (placeholder) {
              placeholder.remove();
              emit('update:modelValue', cleanContent(editorRef.value!.innerHTML));
            }
          }
        });
      }
    }, 0);
  }
};

const insertNewPart = () => {
  insertAtCursor('<hr />');
  isToolbarOpen.value = false;
};

const insertAtCursor = (html: string) => {
  if (editorRef.value) {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    // Se não houver seleção ou range, insere no final
    if (!selection || !range || !editorRef.value.contains(range.commonAncestorContainer)) {
      editorRef.value.innerHTML += html;
      emit('update:modelValue', cleanContent(editorRef.value.innerHTML));
      return;
    }

    // Cria um fragmento com o novo conteúdo
    const fragment = document.createRange().createContextualFragment(html);
    
    // Insere o conteúdo na posição atual
    range.deleteContents();
    range.insertNode(fragment);
    
    // Move o cursor para depois do conteúdo inserido
    range.setStartAfter(fragment);
    range.setEndAfter(fragment);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Mantém o foco no editor
    editorRef.value.focus();
    
    // Atualiza o modelo com o conteúdo limpo
    emit('update:modelValue', cleanContent(editorRef.value.innerHTML));
  }
};

const updateFormatButtonPosition = () => {
  if (!formatButtonRef.value || !editorRef.value) return;

  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const editorRect = editorRef.value.getBoundingClientRect();

  // Posiciona o botão ao lado do cursor
  formatButtonRef.value.style.top = `${rect.top - editorRect.top + editorRef.value.scrollTop}px`;
  formatButtonRef.value.style.left = '0.75rem';

  // Atualiza a posição da toolbar se estiver aberta
  if (isToolbarOpen.value && formatToolbarRef.value) {
    formatToolbarRef.value.style.top = `${rect.top - editorRect.top + editorRef.value.scrollTop}px`;
    formatToolbarRef.value.style.left = '3rem';
  }
};

const cleanContent = (content: string): string => {
  // Remove placeholders
  content = content.replace(/<span[^>]*class="[^"]*placeholder[^"]*"[^>]*>.*?<\/span>/gs, '');
  
  // Remove contenteditable attributes
  content = content.replace(/contenteditable="[^"]*"/g, '');
  
  // Remove onclick attributes
  content = content.replace(/onclick="[^"]*"/g, '');
  
  // Preserve important classes and styles
  const preservedClasses = ['text-lg', 'leading-relaxed', 'my-6'];
  const preservedStyles = ['max-width', 'width', 'height', 'border-radius'];
  
  // Remove inline styles except preserved ones
  content = content.replace(/style="([^"]*)"/g, (match, styles) => {
    const preservedStylesList = styles.split(';')
      .filter((style: string) => preservedStyles.some(preserved => style.includes(preserved)))
      .join(';');
    return preservedStylesList ? `style="${preservedStylesList}"` : '';
  });
  
  // Clean up empty spans that don't have preserved classes
  content = content.replace(/<span[^>]*>(?!.*?class="[^"]*(?:text-lg|leading-relaxed|my-6)[^"]*")[^<]*<\/span>/g, '');
  
  // Clean up empty divs
  content = content.replace(/<div[^>]*>\s*<\/div>/g, '');
  
  // Ensure paragraphs have proper classes
  content = content.replace(/<p>/g, '<p class="text-lg leading-relaxed my-6">');
  
  return content;
};

const handleInput = () => {
  if (editorRef.value) {
    const cleanedContent = cleanContent(editorRef.value.innerHTML);
    emit('update:modelValue', cleanedContent);
    updateFormatButtonPosition();
  }
};

const handleClick = () => {
  showToolbar.value = true;
  updateFormatButtonPosition();
};

const handleKeyUp = () => {
  showToolbar.value = true;
  updateFormatButtonPosition();
};

const handleFocus = () => {
  showToolbar.value = true;
  updateFormatButtonPosition();
};

const handleBlur = () => {
  // Não esconde o botão quando o editor perde o foco
  handleInput();
};

const handleScroll = () => {
  updateFormatButtonPosition();
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.editor-container')) {
    showToolbar.value = false;
    isToolbarOpen.value = false;
  }
};

const handleImageClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.tagName === 'IMG') {
    activeImageRef.value = target;
    const rect = target.getBoundingClientRect();
    const editorRect = editorRef.value?.getBoundingClientRect();
    
    if (editorRect) {
      imageControlsPosition.value = {
        top: rect.top - editorRect.top + editorRef.value!.scrollTop - 40,
        left: rect.left - editorRect.left
      };
      showImageControls.value = true;
    }
  } else {
    showImageControls.value = false;
  }
};

const resizeImage = (size: 'small' | 'medium' | 'large') => {
  if (activeImageRef.value) {
    const sizes = {
      small: '200px',
      medium: '400px',
      large: '800px'
    };
    
    activeImageRef.value.style.width = sizes[size];
    activeImageRef.value.style.height = 'auto';
    showImageControls.value = false;
    
    // Update the model value to reflect the changes
    if (editorRef.value) {
      emit('update:modelValue', cleanContent(editorRef.value.innerHTML));
    }
  }
};

const handleVideoInputKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleVideoUrlSubmit();
  } else if (event.key === 'Escape') {
    showVideoInput.value = false;
    videoUrl.value = '';
  }
};

const handleVideoUrlSubmit = () => {
  const embedUrl = getEmbedUrl(videoUrl.value);
  if (embedUrl) {
    const videoTag = `<p class="text-lg leading-relaxed my-6">
      <div class="video-wrapper" style="max-width: 100%; border-radius: 8px;">
        <iframe 
          src="${embedUrl}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="width: 100%; height: 100%; border-radius: 8px;"
        ></iframe>
      </div>
    </p>`;
    insertAtCursor(videoTag);
    showVideoInput.value = false;
    videoUrl.value = '';
  } else {
    alert('Please enter a valid YouTube, Vimeo, or Dailymotion URL');
  }
};

onMounted(() => {
  if (editorRef.value) {
    // Set initial content
    editorRef.value.innerHTML = props.modelValue || '';
    
    // Add event listeners
    document.addEventListener('click', handleClickOutside);
    editorRef.value.addEventListener('scroll', handleScroll);
    editorRef.value.addEventListener('click', handleImageClick);
  }
});

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (editorRef.value && newValue !== editorRef.value.innerHTML) {
    editorRef.value.innerHTML = newValue || '';
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (editorRef.value) {
    editorRef.value.removeEventListener('scroll', handleScroll);
    editorRef.value.removeEventListener('click', handleImageClick);
  }
});
</script>

<template>
  <div class="page-container">
    <div class="editor-container">
      <div class="editor-wrapper">
        <div
          ref="editorRef"
          class="editor"
          contenteditable="true"
          @input="handleInput"
          @keyup="handleKeyUp"
          @click="handleClick"
          @focus="handleFocus"
          @blur="handleBlur"
        ></div>
        
        <div
          v-if="showToolbar"
          ref="formatButtonRef"
          class="format-button"
          @click="isToolbarOpen = !isToolbarOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>

        <div
          v-if="isToolbarOpen"
          ref="formatToolbarRef"
          class="format-toolbar"
        >
          <button @click="insertImage" title="Insert Image">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Image</span>
          </button>
          <button @click="insertUnsplashImage" title="Insert Unsplash Image">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
              <path d="M21 15l-2-2"></path>
            </svg>
            <span>Unsplash</span>
          </button>
          <button @click="insertVideo" title="Insert Video">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Video</span>
          </button>
          <button @click="insertEmbed" title="Insert Embed">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>Embed</span>
          </button>
          <button @click="insertCodeBlock" title="Insert Code Block">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>Code</span>
          </button>
          <button @click="insertNewPart" title="Insert New Part">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>New Part</span>
          </button>
        </div>

        <div
          v-if="showVideoInput"
          class="video-input-container"
          :style="{
            top: `${videoInputPosition.top}px`,
            left: `${videoInputPosition.left}px`
          }"
        >
          <input
            type="text"
            v-model="videoUrl"
            @keydown="handleVideoInputKeydown"
            placeholder="Enter YouTube, Vimeo, or Dailymotion URL"
            class="video-input"
          />
          <button @click="handleVideoUrlSubmit" class="video-submit-btn">Insert</button>
        </div>

        <!-- Image size controls -->
        <div
          v-if="showImageControls"
          class="image-size-controls"
          :style="{
            top: `${imageControlsPosition.top}px`,
            left: `${imageControlsPosition.left}px`
          }"
        >
          <button @click="resizeImage('small')" title="Small">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Small
          </button>
          <button @click="resizeImage('medium')" title="Medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Medium
          </button>
          <button @click="resizeImage('large')" title="Large">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Large
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 1rem;
}

.editor-container {
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 0 auto;
}

.editor-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.editor {
  width: 100%;
  min-height: 500px;
  padding: 2rem;
  padding-left: 3.5rem;
  border: none;
  outline: none;
  background: white;
  line-height: 1.8;
  font-size: 1.1rem;
  flex: 1;
  overflow-y: auto;
  resize: vertical;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.editor:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.editor .editable-content {
  display: inline-block;
  position: relative;
  margin: 0.5rem 0;
}

.editor .editable-content img,
.editor .editable-content video,
.editor .editable-content iframe {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.editor .editable-content pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0;
}

.editor hr {
  margin: 2rem 0;
  border: none;
  border-top: 2px solid #eee;
}

.format-button {
  position: absolute;
  width: 32px;
  height: 32px; 
  border: 1px solid #525252;
  border-radius: 50%;
  color: #525252;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 1000;
}

.format-toolbar {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  animation: slideRight 0.2s ease-out;
}

.format-toolbar button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  min-width: 60px;
}

.format-toolbar button:hover {
  background: #f0f0f0;
}

.format-toolbar button svg {
  color: #666;
}

.format-toolbar button span {
  font-size: 0.75rem;
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  margin: 1rem 0;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
}

.editor :deep(.code-block) {
  border: 2px solid #E5E5E5 !important;
  border-radius: 4px;
  margin: 1rem 0;
  padding: 1rem;
  background: #F9F9F9 !important;
  display: block;
  color: #333;
}

.editor :deep(.code-block):hover {
  border: 2px solid #6B6B6B !important;
  
}

.editor :deep(.code-block pre) {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  background: transparent;
}

.editor :deep(.code-block code) {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  color: #333;
  background: transparent;
}

.video-input-container {
  position: absolute;
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
  transform: translateY(-50%); /* Centraliza verticalmente com o cursor */
}

.video-input {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  background: white;
}

.video-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.video-submit-btn {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.video-submit-btn:hover {
  background: #0056b3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.video-placeholder {
  display: inline-block;
  margin: 0 4px;
  vertical-align: middle;
}

.inline-video-input {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  background: white;
  outline: none;
  transition: all 0.2s;
}

.inline-video-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.image-placeholder,
.code-placeholder {
  display: inline-block;
  margin: 0 4px;
  vertical-align: middle;
  border: none;
}

.inline-image-input,
.inline-code-input {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  background: white;
  outline: none;
  transition: all 0.2s;
}

.inline-code-input {
  min-height: 100px;
  resize: vertical;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.inline-image-input:focus,
.inline-code-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.image-size-controls {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  animation: fadeIn 0.2s ease-out;
}

.image-size-controls button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.image-size-controls button:hover {
  background: #f0f0f0;
}

.image-size-controls button svg {
  color: #666;
}
</style> 