const STORAGE_KEY = 'blog-dev-playground-files';
const PREVIEW_DATA_KEY = 'playground-posts';

const defaultHtml = String.raw`<header>
  <h1>My Mini Blog</h1>
</header>

<main id="posts"></main>

<section id="create">
  <h2>新しい記事を作成</h2>
  <input id="title" placeholder="タイトル" />
  <textarea id="content" placeholder="内容"></textarea>
  <button id="add" type="button">投稿</button>
</section>`;

const defaultCss = String.raw`body {
  font-family: sans-serif;
  background: #f5f5f5;
  margin: 0;
  color: #2f2f2f;
  line-height: 1.6;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

header {
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  display: grid;
  gap: 2rem;
}

#posts {
  display: grid;
  gap: 1.25rem;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  color: #5a6475;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.post {
  background: white;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.post h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.post p {
  margin: 0 0 1rem;
  color: #555;
}

.post-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.post.editing {
  border-color: rgba(0, 123, 255, 0.45);
  box-shadow: 0 20px 36px rgba(0, 123, 255, 0.18);
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.08), #ffffff);
}

.post-edit-form {
  display: grid;
  gap: 0.75rem;
}

.post-edit-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
}

.post-edit-input,
.post-edit-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cfd6e4;
  border-radius: 10px;
  font-size: 1rem;
  background: #f9fbff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.post-edit-textarea {
  min-height: 160px;
  resize: vertical;
}

.post-edit-input:focus,
.post-edit-textarea:focus {
  outline: none;
  border-color: #007bff;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
}

#create {
  background: white;
  padding: 1.75rem 1.5rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: grid;
  gap: 1.25rem;
  width: min(520px, calc(100% - 2rem));
  margin: 0 auto 3rem;
}

#create h2 {
  margin: 0;
  font-size: 1.4rem;
}

#create input,
#create textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cfd6e4;
  border-radius: 10px;
  font-size: 1rem;
  background: #f9fbff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

#create textarea {
  min-height: 160px;
  resize: vertical;
}

#create input:focus,
#create textarea:focus {
  outline: none;
  border-color: #007bff;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.7rem 1.25rem;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  background: #0065d6;
  box-shadow: 0 10px 24px rgba(0, 101, 214, 0.25);
}

button.secondary {
  background: white;
  color: #0f49a1;
  border: 1px solid rgba(15, 73, 161, 0.35);
  box-shadow: none;
}

button.secondary:hover {
  background: rgba(15, 73, 161, 0.08);
}

button.danger {
  background: #ef4444;
  box-shadow: 0 10px 24px rgba(239, 68, 68, 0.25);
}

button.danger:hover {
  background: #dc2626;
  box-shadow: 0 12px 28px rgba(220, 38, 38, 0.28);
}`;

const defaultJs = `const STORAGE_KEY_POSTS = "posts";

function loadPosts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_POSTS);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("投稿データの読み込みに失敗しました", error);
    return [];
  }
}

function savePosts(data) {
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(data));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const postsContainer = document.getElementById("posts");
const addButton = document.getElementById("add");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

if (!postsContainer || !addButton || !titleInput || !contentInput) {
  console.error("必要な要素が見つかりませんでした。");
} else {
  let posts = loadPosts();
  let editingIndex = null;

  function resetForm() {
    titleInput.value = "";
    contentInput.value = "";
  }

  function createPostView(post, index) {
    const safeTitle = escapeHtml(post.title || "");
    const safeContent = escapeHtml(post.content || "").replace(/\\n/g, "<br>");
    return '<article class="post">' +
      '<h3>' + safeTitle + '</h3>' +
      '<p>' + safeContent + '</p>' +
      '<div class="post-actions">' +
      '<button type="button" class="secondary" onclick="startEdit(' + index + ')">編集</button>' +
      '<button type="button" class="danger" onclick="deletePost(' + index + ')">削除</button>' +
      '</div>' +
      '</article>';
  }

  function createEditView(post, index) {
    const safeTitle = escapeHtml(post.title || "");
    const safeContent = escapeHtml(post.content || "");
    return '<article class="post editing">' +
      '<div class="post-edit-form">' +
      '<label class="post-edit-label" for="edit-title-' + index + '">タイトル</label>' +
      '<input id="edit-title-' + index + '" class="post-edit-input" value="' + safeTitle + '">' +
      '<label class="post-edit-label" for="edit-content-' + index + '">内容</label>' +
      '<textarea id="edit-content-' + index + '" class="post-edit-textarea">' + safeContent + '</textarea>' +
      '<div class="post-actions">' +
      '<button type="button" onclick="saveEdit(' + index + ')">保存</button>' +
      '<button type="button" class="secondary" onclick="cancelEdit()">キャンセル</button>' +
      '<button type="button" class="danger" onclick="deletePost(' + index + ')">削除</button>' +
      '</div>' +
      '</div>' +
      '</article>';
  }

  function renderPosts() {
    if (!posts.length) {
      postsContainer.innerHTML = '<div class="empty-state">投稿はまだありません。最初の記事を作成しましょう。</div>';
      return;
    }

    postsContainer.innerHTML = posts
      .map(function (post, index) {
        return editingIndex === index ? createEditView(post, index) : createPostView(post, index);
      })
      .join("");
  }

  function handleSubmit() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      alert("タイトルと内容を入力してください");
      return;
    }

    posts.push({ title: title, content: content });
    savePosts(posts);
    renderPosts();
    resetForm();
  }

  function startEdit(index) {
    editingIndex = index;
    renderPosts();
    const titleField = document.getElementById('edit-title-' + index);
    if (titleField) {
      titleField.focus();
    }
  }

  function cancelEdit() {
    editingIndex = null;
    renderPosts();
  }

  function saveEdit(index) {
    const titleField = document.getElementById('edit-title-' + index);
    const contentField = document.getElementById('edit-content-' + index);

    if (!titleField || !contentField) {
      return;
    }

    const title = titleField.value.trim();
    const content = contentField.value.trim();

    if (!title || !content) {
      alert("タイトルと内容を入力してください");
      return;
    }

    posts[index] = { title: title, content: content };
    savePosts(posts);
    editingIndex = null;
    renderPosts();
  }

  function deletePost(index) {
    if (!confirm("この記事を削除しますか？")) {
      return;
    }
    posts.splice(index, 1);
    savePosts(posts);

    if (editingIndex === index) {
      editingIndex = null;
    } else if (editingIndex !== null && editingIndex > index) {
      editingIndex -= 1;
    }

    renderPosts();
  }

  resetForm();
  renderPosts();

  window.handleSubmit = handleSubmit;
  window.startEdit = startEdit;
  window.cancelEdit = cancelEdit;
  window.saveEdit = saveEdit;
  window.deletePost = deletePost;
}
`;

const defaultFiles = {
  html: defaultHtml,
  css: defaultCss,
  js: defaultJs
};

const htmlEditor = document.getElementById('html-editor');
const cssEditor = document.getElementById('css-editor');
const jsEditor = document.getElementById('js-editor');
const preview = document.getElementById('preview');

function loadFiles() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { ...defaultFiles };
  }

  try {
    return { ...defaultFiles, ...JSON.parse(saved) };
  } catch (error) {
    // 壊れたデータで起動できないと学習が止まってしまうため、例外時は初期コードに戻します
    console.error('保存データの読み込みに失敗しました', error);
    return { ...defaultFiles };
  }
}

let files = loadFiles();

htmlEditor.value = files.html;
cssEditor.value = files.css;
jsEditor.value = files.js;

function updatePreview() {
  const html = htmlEditor.value;
  const css = cssEditor.value;
  const js = jsEditor.value;

  const doc = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>${css}</style>
</head>
<body>
${html}
<script>${js.replace(/<\/script>/g, '<\\/script>')}<\/script>
</body>
</html>`;

  preview.srcdoc = doc;
}

function saveFiles() {
  files = {
    html: htmlEditor.value,
    css: cssEditor.value,
    js: jsEditor.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
}

function resetPreviewData() {
  // プレビュー側のローカルストレージを初期化しないと、記事データがサンプルに戻らないため
  try {
    preview.contentWindow?.localStorage?.removeItem(PREVIEW_DATA_KEY);
  } catch (error) {
    console.warn('プレビューの保存データを初期化できませんでした', error);
  }
  localStorage.removeItem(PREVIEW_DATA_KEY);
}

function resetFiles() {
  if (!confirm('初期コードに戻しますか？保存されている変更は失われます。')) {
    return;
  }

  files = { ...defaultFiles };
  htmlEditor.value = files.html;
  cssEditor.value = files.css;
  jsEditor.value = files.js;
  saveFiles();
  resetPreviewData();
  updatePreview();
}

function downloadProject() {
  const blob = new Blob(
    [
      `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
${cssEditor.value}
</style>
</head>
<body>
${htmlEditor.value}
<script>
${jsEditor.value}
<\/script>
</body>
</html>`
    ],
    { type: 'text/html' }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'blog-playground.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.querySelectorAll('.editor-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.editor-tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('textarea').forEach((area) => {
      area.classList.remove('active');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const target = document.getElementById(`${tab.dataset.tab}-editor`);
    target.classList.add('active');
    target.focus();
  });
});

htmlEditor.addEventListener('input', () => {
  updatePreview();
  saveFiles();
});
cssEditor.addEventListener('input', () => {
  updatePreview();
  saveFiles();
});
jsEditor.addEventListener('input', () => {
  updatePreview();
  saveFiles();
});
document.getElementById('reset-button').addEventListener('click', () => {
  resetFiles();
});
document.getElementById('download-button').addEventListener('click', () => {
  downloadProject();
});

updatePreview();
