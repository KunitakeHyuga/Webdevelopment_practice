const STORAGE_KEY = 'blog-dev-playground-files';
const PREVIEW_DATA_KEY = 'playground-posts';

const defaultHtml = String.raw`<!-- 画面遷移がシンプルに追えるよう、無難なブログ投稿レイアウトを土台にしています -->
<div class="blog-app">
  <header class="blog-header">
    <div class="header-inner">
      <h1 class="brand">Simple Blog</h1>
      <p class="tagline">日々の気づきを気軽に発信するサンプルブログです。</p>
      <nav class="nav">
        <a href="#/" class="nav-link">ホーム</a>
        <a href="#/about" class="nav-link">About</a>
        <a href="#/create" class="nav-link nav-link-primary">記事を書く</a>
      </nav>
    </div>
  </header>

  <main class="blog-main">
    <section class="hero">
      <h2 class="hero-title">ブログ投稿の基本を体験しましょう</h2>
      <p class="hero-text">投稿・閲覧・編集の流れを確認できるように、一覧と詳細をシンプルにまとめています。</p>
      <button type="button" class="btn btn-primary" onclick="location.hash='#/create'">新しい記事を作成</button>
    </section>

    <section id="content" class="view-area">
      <!-- JavaScriptで記事一覧や詳細を差し替えます -->
    </section>
  </main>

  <footer class="blog-footer">
    <small>© 2025 Simple Blog. All rights reserved.</small>
  </footer>
</div>`;

const defaultCss = String.raw`/* どの画面でも落ち着いた雰囲気に見えるよう、ベースカラーを柔らかく統一しています */
:root {
  --color-bg: #f5f7fb;
  --color-surface: #ffffff;
  --color-primary: #2563eb;
  --color-text: #1f2937;
  --color-muted: #6b7280;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.7;
  color: var(--color-text);
  background: var(--color-bg);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

.blog-app {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

.blog-header {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 28px 32px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  margin-bottom: 28px;
}

.header-inner {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.brand {
  font-size: 28px;
  font-weight: 700;
}

.tagline {
  font-size: 14px;
  color: var(--color-muted);
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(37, 99, 235, 0.1);
  color: var(--color-text);
  background: rgba(37, 99, 235, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
}

.nav-link-primary {
  background: var(--color-primary);
  color: #ffffff;
  border-color: transparent;
}

.blog-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(59, 130, 246, 0.16));
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.hero-title {
  font-size: 24px;
  font-weight: 700;
}

.hero-text {
  font-size: 15px;
  color: var(--color-muted);
}

.view-area {
  background: var(--color-surface);
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  padding: 32px;
  min-height: 320px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 16px;
}

.post-list {
  display: grid;
  gap: 18px;
}

.post-card {
  border: 1px solid rgba(37, 99, 235, 0.08);
  border-radius: 14px;
  padding: 20px 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.9));
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post-card:hover {
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.12);
}

.post-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
}

.post-meta {
  font-size: 13px;
  color: var(--color-muted);
}

.post-excerpt {
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.6;
}

.post-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-content {
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text);
}

.post-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.empty-state {
  text-align: center;
  display: grid;
  gap: 12px;
}

.about-section {
  display: grid;
  gap: 14px;
  color: var(--color-text);
}

.form-card {
  display: grid;
  gap: 20px;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-label {
  font-weight: 600;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  font-size: 14px;
  font-family: inherit;
  background: rgba(249, 250, 251, 0.9);
}

.form-textarea {
  min-height: 220px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 9999px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.18);
}

.btn-primary {
  background: var(--color-primary);
  color: #ffffff;
}

.btn-secondary {
  background: rgba(15, 23, 42, 0.08);
  color: var(--color-text);
}

.btn-danger {
  background: #ef4444;
  color: #ffffff;
}

.btn-link {
  background: transparent;
  color: var(--color-primary);
  padding: 0;
  border-radius: 0;
}

.blog-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 12px;
  color: var(--color-muted);
}

@media (max-width: 768px) {
  .blog-app {
    padding: 24px 16px 48px;
  }

  .blog-header,
  .view-area,
  .hero {
    padding: 24px;
  }
}`;

const defaultJs = `// このサンプルでは、無難なブログ投稿画面に必要なCRUDと簡易ルーティングをフロントだけで体験できるようにしています
const STORAGE_KEY_POSTS = \${PREVIEW_DATA_KEY};

const seedPosts = [
  {
    id: 1,
    title: '週末に読みたい本のメモ',
    content: 'このサンプル記事では、最近気になっている本の感想や読みたいポイントを整理しています。\\n学習目的なので、自由にタイトルや本文を書き換えて使ってください。',
    date: '2025-02-01'
  },
  {
    id: 2,
    title: '開発メモ: ブログ投稿の流れ',
    content: 'ブログ投稿は、下書き→プレビュー→公開という手順を踏むと整理しやすくなります。\\nフォーム入力とプレビューの関係に注目してみましょう。',
    date: '2025-02-03'
  }
];

let posts = JSON.parse(localStorage.getItem(STORAGE_KEY_POSTS) || '[]');

if (!posts.length) {
  // 空の一覧だと完成イメージが掴みにくいので、最低限のシードデータを用意しています
  posts = [...seedPosts];
}

let nextId = posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;

// HTMLを安全に表示するために、ユーザー入力は必ずエスケープします
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ハッシュルーティングを使う理由: 単一ページでも画面遷移の概念を体験してもらいたいため
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
  if (!posts.length) {
    content.innerHTML = \`
      <section class="empty-state">
        <h3>まだ記事がありません</h3>
        <p>右上の「記事を書く」から投稿を作成すると、ここに一覧が表示されます。</p>
        <button type="button" class="btn btn-primary" onclick="location.hash='#/create'">記事を書く</button>
      </section>
    \`
    return
  }

  const list = posts
    .map((post) => {
      const flatContent = post.content.replace(/\\n/g, ' ').trim()
      const excerptText = flatContent.length > 110 ? \`\${flatContent.slice(0, 110)}...\` : flatContent
      const safeTitle = escapeHtml(post.title)
      const safeExcerpt = escapeHtml(excerptText || '本文が入力されていません。')

      return \`
        <article class="post-card">
          <a class="post-title" href="#/post/\${post.id}">\${safeTitle}</a>
          <div class="post-meta">\${post.date}</div>
          <p class="post-excerpt">\${safeExcerpt}</p>
          <button type="button" class="btn btn-link" onclick="location.hash='#/post/\${post.id}'">続きを読む</button>
        </article>
      \`
    })
    .join('')

  content.innerHTML = \`
    <section class="post-section">
      <h2 class="section-title">最新の記事</h2>
      <div class="post-list">\${list}</div>
    </section>
  \`
}

function showPostDetail(content, id) {
  const post = posts.find((item) => item.id === id)

  if (!post) {
    content.innerHTML = '<p>記事が見つかりませんでした。一覧に戻ってください。</p>'
    return
  }

  const safeTitle = escapeHtml(post.title)
  const safeContent = escapeHtml(post.content).replace(/\\n/g, '<br>')

  content.innerHTML = \`
    <article class="post-detail">
      <h2 class="post-title">\${safeTitle}</h2>
      <div class="post-meta">\${post.date}</div>
      <div class="post-content">\${safeContent}</div>
      <div class="post-actions">
        <button type="button" class="btn btn-primary" onclick="location.hash='#/edit/\${post.id}'">編集する</button>
        <button type="button" class="btn btn-danger" onclick="deletePost(\${post.id})">削除する</button>
        <button type="button" class="btn btn-secondary" onclick="location.hash='#/'">一覧へ戻る</button>
      </div>
    </article>
  \`
}

function showAboutPage(content) {
  content.innerHTML = \`
    <section class="about-section">
      <h2 class="section-title">About</h2>
      <p>このサンプルは、ブログ投稿アプリの最小構成をブラウザだけで試せるようにした学習用テンプレートです。</p>
      <ul>
        <li>ハッシュURLでページ切り替えの雰囲気を再現しています。</li>
        <li>記事データはローカルストレージに保存されるため、ブラウザを閉じても続きから学べます。</li>
        <li>HTML・CSSを変更するとレイアウトがリアルタイムで更新されます。</li>
      </ul>
    </section>
  \`
}

function showCreatePage(content) {
  content.innerHTML = \`
    <section class="form-card">
      <h2 class="section-title">新しい記事を作成</h2>
      <form onsubmit="createPost(event)">
        <div class="form-group">
          <label class="form-label" for="title">タイトル</label>
          <input id="title" type="text" class="form-input" placeholder="例: 今日の学びメモ" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="content">本文</label>
          <textarea id="content" class="form-textarea" placeholder="本文を入力してください" required></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">投稿する</button>
          <button type="button" class="btn btn-secondary" onclick="location.hash='#/'">キャンセル</button>
        </div>
      </form>
    </section>
  \`
}

function showEditPage(content, id) {
  const post = posts.find((item) => item.id === id)

  if (!post) {
    content.innerHTML = '<p>編集対象の記事が見つかりません。</p>'
    return
  }

  content.innerHTML = \`
    <section class="form-card">
      <h2 class="section-title">記事を編集</h2>
      <form onsubmit="updatePost(event, \${id})">
        <div class="form-group">
          <label class="form-label" for="title">タイトル</label>
          <input id="title" type="text" class="form-input" value="\${escapeHtml(post.title)}" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="content">本文</label>
          <textarea id="content" class="form-textarea" required>\${escapeHtml(post.content)}</textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">更新する</button>
          <button type="button" class="btn btn-secondary" onclick="location.hash='#/post/\${id}'">キャンセル</button>
        </div>
      </form>
    </section>
  \`
}

function persistPosts() {
  // 学習の進み具合を保持することで、再訪時に復習できるようにしています
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts))
}

function createPost(event) {
  event.preventDefault()
  const titleInput = document.getElementById('title')
  const contentInput = document.getElementById('content')
  const title = titleInput.value.trim()
  const content = contentInput.value.trim()

  if (!title || !content) {
    alert('タイトルと本文は必須です。')
    return
  }

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
  const titleInput = document.getElementById('title')
  const contentInput = document.getElementById('content')
  const title = titleInput.value.trim()
  const content = contentInput.value.trim()

  if (!title || !content) {
    alert('タイトルと本文は必須です。')
    return
  }

  const post = posts.find((item) => item.id === id)
  if (post) {
    post.title = title
    post.content = content
    persistPosts()
    location.hash = \`#/post/\${id}\`
  }
}

function deletePost(id) {
  if (confirm('本当に削除しますか？')) {
    posts = posts.filter((item) => item.id !== id)
    persistPosts()
    location.hash = '#/'
  }
}

// ハッシュリンクをそのまま遷移させると親ページを開いてしまうため、ここで抑止して手動でハッシュを書き換えます
document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href^="#/"]')
  if (!anchor) {
    return
  }

  event.preventDefault()
  const targetHash = anchor.getAttribute('href')
  if (typeof targetHash === 'string') {
    window.location.hash = targetHash
  }
})

window.addEventListener('hashchange', router)
window.addEventListener('load', () => {
  router()
})
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
