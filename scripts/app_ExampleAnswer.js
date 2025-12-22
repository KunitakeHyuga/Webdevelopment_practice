const STORAGE_KEY = 'blog-dev-playground-files';
const PREVIEW_DATA_KEY = 'playground-posts';

const defaultHtml = String.raw`<!-- サイト全体の見出し -->
<header>
  <h1>My Mini Blog</h1>
</header>

<!-- 投稿一覧を表示する領域（JavaScript で中身を差し込む） -->
<main id="posts"></main>

<!-- 新しい記事を作成するフォーム -->
<section id="create">
  <h2>新しい記事を作成</h2>
  <input id="title" placeholder="タイトル" />
  <textarea id="content" placeholder="内容"></textarea>
  <button id="add" type="button">投稿</button>
</section>`;

const defaultCss = String.raw`/* ページ全体の基本スタイル */
body {
  font-family: sans-serif;
  background: #f5f5f5;
  margin: 0;
  color: #2f2f2f;
  line-height: 1.6;
}

/* すべての要素の余白と箱サイズをリセット */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* サイト上部のヘッダー見た目 */
header {
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* メインコンテンツ全体のレイアウト */
main {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  display: grid;
  gap: 2rem;
}

/* 投稿カードを縦方向に並べる設定 */
#posts {
  display: grid;
  gap: 1.25rem;
}

/* 投稿がないときの案内パネル */
.empty-state {
  background: white;
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  color: #5a6475;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

/* 個々の投稿カードの見た目 */
.post {
  background: white;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

/* 投稿タイトル */
.post h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

/* 投稿本文 */
.post p {
  margin: 0 0 1rem;
  color: #555;
}

/* 投稿カード下部のボタン配置 */
.post-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* 編集モードの投稿を強調表示 */
.post.editing {
  border-color: rgba(0, 123, 255, 0.45);
  box-shadow: 0 20px 36px rgba(0, 123, 255, 0.18);
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.08), #ffffff);
}

/* 編集フォーム全体の配置 */
.post-edit-form {
  display: grid;
  gap: 0.75rem;
}

/* ラベルの見た目を少し強調 */
.post-edit-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
}

/* 編集フォームの入力欄 */
.post-edit-input,
/* 本文入力欄は高さを確保 */
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

/* 入力欄にフォーカスしたときの強調 */
.post-edit-input:focus,
.post-edit-textarea:focus {
  outline: none;
  border-color: #007bff;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
}

/* 新規投稿フォーム全体の飾り */
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

/* フォーム内の見出し */
#create h2 {
  margin: 0;
  font-size: 1.4rem;
}

/* 入力欄を横幅いっぱいにする */
#create input,
/* 本文入力欄はある程度の高さからスタート */
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

/* 基本のボタン装飾 */
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

/* ボタンにカーソルを合わせたときの演出 */
button:hover {
  transform: translateY(-1px);
  background: #0065d6;
  box-shadow: 0 10px 24px rgba(0, 101, 214, 0.25);
}

/* サブボタン（編集キャンセルなど）の配色 */
button.secondary {
  background: white;
  color: #0f49a1;
  border: 1px solid rgba(15, 73, 161, 0.35);
  box-shadow: none;
}

/* サブボタンのホバー時 */
button.secondary:hover {
  background: rgba(15, 73, 161, 0.08);
}

/* 削除用の危険ボタン */
button.danger {
  background: #ef4444;
  box-shadow: 0 10px 24px rgba(239, 68, 68, 0.25);
}

/* 危険ボタンのホバー時 */
button.danger:hover {
  background: #dc2626;
  box-shadow: 0 12px 28px rgba(220, 38, 38, 0.28);
}`;

const defaultJs = `// 投稿データを保存しておくローカルストレージのキー
const STORAGE_KEY_POSTS = "posts";

// 保存済みの投稿一覧を読み込む
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

// 投稿一覧をローカルストレージに保存する
function savePosts(data) {
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(data));
}

// 危険な文字を無害化する（XSS対策）
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
  // 投稿一覧の実データを管理する変数
  let posts = loadPosts();
  // どの投稿を編集中かを表す番号（なければnull）
  let editingIndex = null;

  // フォームの入力欄を空に戻す
  function resetForm() {
    titleInput.value = "";
    contentInput.value = "";
  }

  // 表示用の投稿カードHTMLを組み立てる
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

  // 編集モードの投稿カードHTMLを組み立てる
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

  // 投稿一覧全体を再描画する
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

  // 投稿ボタンを押したときの処理
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

  // 編集ボタンを押したときの処理
  function startEdit(index) {
    editingIndex = index;
    renderPosts();
    const titleField = document.getElementById('edit-title-' + index);
    if (titleField) {
      titleField.focus();
    }
  }

  // 編集をキャンセルして通常表示に戻す
  function cancelEdit() {
    editingIndex = null;
    renderPosts();
  }

  // 編集内容を保存する
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

  // 投稿を削除する
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

  // 初期状態でフォームを空にし、画面を描画
  resetForm();
  renderPosts();

  // ボタンからこれらの関数を呼べるようにグローバル公開
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

const editorSurfaces = {
  html: document.getElementById('html-editor'),
  css: document.getElementById('css-editor'),
  js: document.getElementById('js-editor')
};
const editors = {
  html: null,
  css: null,
  js: null
};
const preview = document.getElementById('preview');
const supportsSrcdoc = 'srcdoc' in preview;
let previewBlobUrl = null;
const MONACO_BASE_URL = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min';
let editorMode = 'pending';

function handleEditorChange(type) {
  const adapter = editors[type];
  if (!adapter) {
    return;
  }
  files[type] = adapter.getValue();
  updatePreview();
  saveFiles();
}

function createMonacoAdapter(type, initialValue) {
  const surface = editorSurfaces[type];
  surface.innerHTML = '';

  const baseOptions = {
    value: initialValue,
    theme: 'vs-dark',
    automaticLayout: false,
    minimap: { enabled: false },
    fontSize: 13,
    scrollBeyondLastLine: false,
    renderWhitespace: 'none',
    wordWrap: 'on',
    tabSize: 2,
    insertSpaces: true,
    readOnly: false,
    padding: { top: 16, bottom: 16 }
  };

  const languageMap = {
    html: 'html',
    css: 'css',
    js: 'javascript'
  };

  const editor = monaco.editor.create(surface, {
    ...baseOptions,
    language: languageMap[type]
  });

  editor.onDidChangeModelContent(() => {
    handleEditorChange(type);
  });

  return {
    getValue: () => editor.getValue(),
    setValue: (value) => {
      if (editor.getValue() !== value) {
        editor.setValue(value);
      }
    },
    focus: () => editor.focus(),
    layout: () => editor.layout()
  };
}

function createFallbackAdapter(type, initialValue) {
  const surface = editorSurfaces[type];
  surface.innerHTML = '';
  const textarea = document.createElement('textarea');
  textarea.className = 'fallback-textarea';
  textarea.value = initialValue;
  surface.appendChild(textarea);
  textarea.addEventListener('input', () => {
    handleEditorChange(type);
  });
  return {
    getValue: () => textarea.value,
    setValue: (value) => {
      if (textarea.value !== value) {
        textarea.value = value;
      }
    },
    focus: () => textarea.focus(),
    layout: () => {}
  };
}

function setEditorValue(type, value) {
  files[type] = value;
  const adapter = editors[type];
  if (adapter) {
    adapter.setValue(value);
  }
}

function initializeEditors() {
  if (typeof window.require === 'function') {
    window.MonacoEnvironment = {
      getWorkerUrl() {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          self.MonacoEnvironment = { baseUrl: '${MONACO_BASE_URL}/' };
          importScripts('${MONACO_BASE_URL}/vs/base/worker/workerMain.js');
        `)}`;
      }
    };
    window.require.config({ paths: { vs: `${MONACO_BASE_URL}/vs` } });
    window.require(['vs/editor/editor.main'], () => {
      editorMode = 'monaco';
      ['html', 'css', 'js'].forEach((type) => {
        editors[type] = createMonacoAdapter(type, files[type]);
        if (editorSurfaces[type]?.classList.contains('active')) {
          window.requestAnimationFrame(() => {
            editors[type]?.layout?.();
          });
        }
      });
      updatePreview();
    }, (error) => {
      console.warn('Monaco エディターの読み込みに失敗したためテキストエリアに切り替えます', error);
      initializeFallbackEditors();
    });
    return;
  }
  initializeFallbackEditors();
}

function initializeFallbackEditors() {
  editorMode = 'fallback';
  ['html', 'css', 'js'].forEach((type) => {
    editors[type] = createFallbackAdapter(type, files[type]);
  });
  updatePreview();
}

function loadFiles() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return { ...defaultFiles };
    }
    return { ...defaultFiles, ...JSON.parse(saved) };
  } catch (error) {
    // 壊れたデータやブラウザ設定による失敗時は初期コードに戻します
    console.warn('保存データの読み込みに失敗したため初期コードを使用します', error);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      console.debug('保存データのリセットに失敗しました', removeError);
    }
    return { ...defaultFiles };
  }
}

let files = loadFiles();

initializeEditors();

function updatePreview() {
  const html = files.html;
  const css = files.css;
  const js = files.js;

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

  if (supportsSrcdoc) {
    preview.srcdoc = doc;
    return;
  }

  if (previewBlobUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
    URL.revokeObjectURL(previewBlobUrl);
    previewBlobUrl = null;
  }

  if (typeof Blob !== 'undefined' && typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    try {
      const blob = new Blob([doc], { type: 'text/html' });
      previewBlobUrl = URL.createObjectURL(blob);
      preview.src = previewBlobUrl;
      return;
    } catch (error) {
      console.error('プレビューの生成に失敗しました', error);
    }
  }

  preview.src = `data:text/html;charset=utf-8,${encodeURIComponent(doc)}`;
}

function saveFiles() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  } catch (error) {
    console.warn('変更内容を保存できませんでした', error);
  }
}

function resetPreviewData() {
  // プレビュー側のローカルストレージを初期化しないと、記事データがサンプルに戻らないため
  try {
    preview.contentWindow?.localStorage?.removeItem(PREVIEW_DATA_KEY);
  } catch (error) {
    console.warn('プレビューの保存データを初期化できませんでした', error);
  }
  try {
    localStorage.removeItem(PREVIEW_DATA_KEY);
  } catch (error) {
    console.debug('エディター側のプレビュー保存データを削除できませんでした', error);
  }
}

function resetFiles(target = 'all') {
  const targetMap = {
    all: ['html', 'css', 'js'],
    html: ['html'],
    css: ['css'],
    js: ['js']
  };
  const labelMap = {
    all: 'すべてのファイル',
    html: 'HTML ファイル',
    css: 'CSS ファイル',
    js: 'JavaScript ファイル'
  };

  const targets = targetMap[target];
  if (!targets) {
    return false;
  }

  if (!confirm(`${labelMap[target]}を初期コードに戻しますか？保存されている変更は失われます。`)) {
    return false;
  }

  targets.forEach((key) => {
    const defaultValue = defaultFiles[key];
    setEditorValue(key, defaultValue);
  });

  if (target === 'all' || target === 'js') {
    resetPreviewData();
  }

  saveFiles();
  updatePreview();
  return true;
}

const resetDialog = (() => {
  let overlay = null;
  let previousFocus = null;

  function close() {
    if (!overlay) {
      return;
    }
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  }

  function attachEvents() {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    overlay.querySelectorAll('[data-target]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        const result = resetFiles(target);
        if (result) {
          close();
        }
      });
    });

    const cancelButton = overlay.querySelector('[data-action="cancel"]');
    cancelButton.addEventListener('click', () => {
      close();
    });
  }

  function ensureDialog() {
    if (overlay) {
      return;
    }

    overlay = document.createElement('div');
    overlay.className = 'reset-modal-overlay';
    overlay.setAttribute('role', 'presentation');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="reset-modal" role="dialog" aria-modal="true" aria-labelledby="reset-modal-title">
        <h2 id="reset-modal-title">初期コードに戻す</h2>
        <p>対象を選んでください。選択後に確認ダイアログが表示されます。</p>
        <div class="reset-modal-buttons" role="group" aria-label="リセット対象の選択">
          <button type="button" data-target="html">HTMLのみ</button>
          <button type="button" data-target="css">CSSのみ</button>
          <button type="button" data-target="js">JavaScriptのみ</button>
          <button type="button" data-target="all" class="danger">すべて</button>
        </div>
        <button type="button" class="reset-modal-cancel" data-action="cancel">キャンセル</button>
      </div>
    `;
    document.body.appendChild(overlay);
    attachEvents();
  }

  function open() {
    ensureDialog();
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    overlay.classList.add('is-visible');
    overlay.removeAttribute('aria-hidden');
    const firstButton = overlay.querySelector('[data-target]');
    if (firstButton) {
      firstButton.focus();
    }
    document.addEventListener('keydown', handleKeydown);
  }

  return { open, close };
})();

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let value = i;
    for (let j = 0; j < 8; j += 1) {
      if (value & 1) {
        value = (value >>> 1) ^ 0xedb88320;
      } else {
        value >>>= 1;
      }
    }
    table[i] = value >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    const byte = bytes[i];
    const lookupIndex = (crc ^ byte) & 0xff;
    crc = CRC32_TABLE[lookupIndex] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concatUint8Arrays(arrays) {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  arrays.forEach((arr) => {
    result.set(arr, offset);
    offset += arr.length;
  });
  return result;
}

function getDosDateTime(date = new Date()) {
  const year = Math.max(date.getFullYear(), 1980) - 1980;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  const dosTime = (hours << 11) | (minutes << 5) | seconds;
  const dosDate = (year << 9) | (month << 5) | day;
  return { dosTime, dosDate };
}

function createZip(files) {
  const encoder = new TextEncoder();
  const { dosTime, dosDate } = getDosDateTime();

  const localParts = [];
  const centralParts = [];
  let localOffset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = encoder.encode(file.content);
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    const localHeader = new Uint8Array(30);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, dosTime, true);
    localView.setUint16(12, dosDate, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, size, true);
    localView.setUint32(22, size, true);
    localView.setUint16(26, nameBytes.length, true);
    localView.setUint16(28, 0, true);

    const localRecord = concatUint8Arrays([localHeader, nameBytes, dataBytes]);
    localParts.push(localRecord);

    const centralHeader = new Uint8Array(46);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, dosTime, true);
    centralView.setUint16(14, dosDate, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, size, true);
    centralView.setUint32(24, size, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, localOffset, true);

    const centralRecord = concatUint8Arrays([centralHeader, nameBytes]);
    centralParts.push(centralRecord);

    localOffset += localRecord.length;
  });

  const localData = concatUint8Arrays(localParts);
  const centralData = concatUint8Arrays(centralParts);

  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralData.length, true);
  endView.setUint32(16, localData.length, true);
  endView.setUint16(20, 0, true);

  const zipBytes = concatUint8Arrays([localData, centralData, endRecord]);
  return new Blob([zipBytes], { type: 'application/zip' });
}

function downloadProject() {
  const htmlDocument = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles.css" />
  <title>Blog Playground Export</title>
</head>
<body>
${files.html}
  <script src="script.js"></script>
</body>
</html>`;

  const zipBlob = createZip([
    { name: 'index.html', content: htmlDocument },
    { name: 'styles.css', content: files.css },
    { name: 'script.js', content: files.js }
  ]);

  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'blog-playground.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.querySelectorAll('.editor-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetKey = tab.dataset.tab;
    if (!targetKey) {
      return;
    }
    document.querySelectorAll('.editor-tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.editor-surface').forEach((surface) => {
      surface.classList.remove('active');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const targetSurface = editorSurfaces[targetKey];
    if (targetSurface) {
      targetSurface.classList.add('active');
    }
    const adapter = editors[targetKey];
    if (adapter) {
      window.requestAnimationFrame(() => {
        adapter.layout?.();
        adapter.focus?.();
      });
    }
  });
});

document.getElementById('reset-button').addEventListener('click', () => {
  resetDialog.open();
});
document.getElementById('download-button').addEventListener('click', () => {
  downloadProject();
});

window.addEventListener('beforeunload', () => {
  if (previewBlobUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
    URL.revokeObjectURL(previewBlobUrl);
    previewBlobUrl = null;
  }
});

updatePreview();
