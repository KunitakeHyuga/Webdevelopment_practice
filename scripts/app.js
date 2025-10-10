const STORAGE_KEY = 'blog-dev-playground-files';
const PREVIEW_DATA_KEY = 'playground-posts';

const defaultHtml = String.raw`<!-- ルーティングで画面が切り替わる土台なので、構造が分かりやすいようシンプルに保っています -->
<div id="app">
  <header class="header">
    <div class="container">
      <h1 class="logo">My Blog</h1>
      <nav class="nav">
        <a href="#/" class="nav-link">ホーム</a>
        <a href="#/about" class="nav-link">About</a>
        <a href="#/create" class="nav-link">新規作成</a>
      </nav>
    </div>
  </header>

  <main class="main container" id="content">
    <!-- ここが各ページの表示領域なので、レイアウトを崩したくない場合はラッパーを残しておきます -->
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 My Blog. All rights reserved.</p>
    </div>
  </footer>
</div>`;

const defaultCss = String.raw`/* 初学者が視覚的な変化を把握しやすいよう、共通余白とフォントを定義しています */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f5f5f5;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  margin-bottom: 30px;
}

.logo {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #555;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #3498db;
}

.main {
  min-height: 60vh;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 20px;
  transition: box-shadow 0.2s;
}

/* 記事カードのホバーを強調する理由: マウス操作で動きが確認できると学習の動機付けになるため */
.post-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.post-title a {
  color: inherit;
  text-decoration: none;
}

.post-title a:hover {
  color: #3498db;
}

.post-meta {
  color: #888;
  font-size: 14px;
  margin-bottom: 10px;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
}

.post-detail {
  max-width: 800px;
}

.post-detail .post-title {
  font-size: 32px;
  margin-bottom: 15px;
}

.post-content {
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  margin-top: 20px;
}

.post-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-textarea {
  min-height: 200px;
  resize: vertical;
}

.footer {
  background: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
}`;

const defaultJs = `// このサンプルコードはSPAとCRUDの両方を体験してもらうため、フロントエンド側でデータを完結させています
const STORAGE_KEY_POSTS = '${PREVIEW_DATA_KEY}';

const seedPosts = [
  {
    id: 1,
    title: '初めてのブログ投稿',
    content: 'これは最初のブログ記事です。HTML、CSS、JavaScriptを使って作られています。',
    date: '2025-01-15'
  },
  {
    id: 2,
    title: 'ルーティングについて',
    content: 'ルーティングを使うことで、異なるページを表示できます。URLのハッシュを使って実装しています。',
    date: '2025-01-20'
  },
  {
    id: 3,
    title: 'CRUD操作とは',
    content: 'Create（作成）、Read（読み取り）、Update（更新）、Delete（削除）の4つの基本操作のことです。',
    date: '2025-01-25'
  }
];

let posts = JSON.parse(localStorage.getItem(STORAGE_KEY_POSTS) || '[]');

if (!posts.length) {
  // 初期データを投入する理由: 空の画面よりも完成イメージがあるほうが学習を始めやすいため
  posts = [...seedPosts];
}

let nextId = posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;

// ハッシュルーティングを使う理由: シングルページで画面遷移の概念を再現したかったため
function router() {
  const hash = window.location.hash || '#/'
  const content = document.getElementById('content')

  if (hash === '#/') {
    showHomePage(content)
  } else if (hash === '#/about') {
    showAboutPage(content)
  } else if (hash === '#/create') {
    showCreatePage(content)
  } else if (hash.startsWith('#/post/')) {
    const id = Number(hash.split('/')[2])
    showPostDetail(content, id)
  } else if (hash.startsWith('#/edit/')) {
    const id = Number(hash.split('/')[2])
    showEditPage(content, id)
  }
}

function showHomePage(content) {
  let html = '<h2>最新の記事</h2><div class="post-list">'

  posts.forEach((post) => {
    html += \`
      <div class="post-card">
        <h3 class="post-title">
          <a href="#/post/\${post.id}">\${post.title}</a>
        </h3>
        <div class="post-meta">\${post.date}</div>
        <p class="post-excerpt">\${post.content.substring(0, 100)}...</p>
      </div>
    \`
  })

  html += '</div>'
  content.innerHTML = html
}

function showPostDetail(content, id) {
  const post = posts.find((p) => p.id === id)

  if (!post) {
    content.innerHTML = '<h2>記事が見つかりません</h2>'
    return
  }

  content.innerHTML = \`
    <div class="post-detail">
      <h2 class="post-title">\${post.title}</h2>
      <div class="post-meta">\${post.date}</div>
      <div class="post-content">\${post.content.replace(/\n/g, '<br>')}</div>
      <div class="post-actions">
        <button class="btn btn-primary" onclick="location.hash='#/edit/\${post.id}'">編集</button>
        <button class="btn btn-danger" onclick="deletePost(\${post.id})">削除</button>
        <button class="btn btn-secondary" onclick="location.hash='#/'">戻る</button>
      </div>
    </div>
  \`
}

function showAboutPage(content) {
  content.innerHTML = \`
    <h2>About</h2>
    <p>このブログは学習用のデモサイトです。</p>
    <p>以下の機能を学べます：</p>
    <ul style="margin-left: 20px; margin-top: 10px;">
      <li>HTML/CSSによるレイアウト</li>
      <li>JavaScriptによるルーティング</li>
      <li>CRUD操作（作成・読取・更新・削除）</li>
    </ul>
  \`
}

function showCreatePage(content) {
  content.innerHTML = \`
    <h2>新しい記事を作成</h2>
    <form onsubmit="createPost(event)">
      <div class="form-group">
        <label class="form-label">タイトル</label>
        <input type="text" class="form-input" id="title" required>
      </div>
      <div class="form-group">
        <label class="form-label">本文</label>
        <textarea class="form-textarea" id="content" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">投稿する</button>
      <button type="button" class="btn btn-secondary" onclick="location.hash='#/'">キャンセル</button>
    </form>
  \`
}

function showEditPage(content, id) {
  const post = posts.find((p) => p.id === id)

  if (!post) {
    content.innerHTML = '<h2>記事が見つかりません</h2>'
    return
  }

  content.innerHTML = \`
    <h2>記事を編集</h2>
    <form onsubmit="updatePost(event, \${id})">
      <div class="form-group">
        <label class="form-label">タイトル</label>
        <input type="text" class="form-input" id="title" value="\${post.title}" required>
      </div>
      <div class="form-group">
        <label class="form-label">本文</label>
        <textarea class="form-textarea" id="content" required>\${post.content}</textarea>
      </div>
      <button type="submit" class="btn btn-primary">更新する</button>
      <button type="button" class="btn btn-secondary" onclick="location.hash='#/post/\${id}'">キャンセル</button>
    </form>
  \`
}

function persistPosts() {
  // 学習の途中でブラウザを閉じても状態を保持したいので、操作ごとに保存します
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts))
}

function createPost(event) {
  event.preventDefault()
  const title = document.getElementById('title').value
  const content = document.getElementById('content').value

  const newPost = {
    id: nextId++,
    title,
    content,
    date: new Date().toISOString().split('T')[0]
  }

  posts.unshift(newPost)
  persistPosts()
  location.hash = '#/'
}

function updatePost(event, id) {
  event.preventDefault()
  const title = document.getElementById('title').value
  const content = document.getElementById('content').value

  const post = posts.find((p) => p.id === id)
  if (post) {
    post.title = title
    post.content = content
    persistPosts()
    location.hash = \`#/post/\${id}\`
  }
}

function deletePost(id) {
  if (confirm('本当に削除しますか？')) {
    posts = posts.filter((p) => p.id !== id)
    persistPosts()
    location.hash = '#/'
  }
}

window.addEventListener('hashchange', router)
window.addEventListener('load', () => {
  router()
})`;

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
});
cssEditor.addEventListener('input', () => {
  updatePreview();
});
jsEditor.addEventListener('input', () => {
  updatePreview();
});

document.getElementById('save-button').addEventListener('click', () => {
  saveFiles();
});
document.getElementById('reset-button').addEventListener('click', () => {
  resetFiles();
});
document.getElementById('download-button').addEventListener('click', () => {
  downloadProject();
});

updatePreview();
