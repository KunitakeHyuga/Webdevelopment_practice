from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .. import models, schemas, database

app = FastAPI()

# CORS（フロントエンドからアクセスできるように）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要ならフロントのURLに限定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# テーブル作成
models.Base.metadata.create_all(bind=database.engine)

# --- 投稿作成 ---
@app.post("/api/posts", response_model=schemas.PostResponse)
def create_post(post: schemas.PostCreate, db: Session = Depends(database.get_db)):
    new_post = models.Post(title=post.title, content=post.content)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

# --- 投稿一覧取得 ---
@app.get("/api/posts", response_model=list[schemas.PostResponse])
def get_posts(db: Session = Depends(database.get_db)):
    posts = db.query(models.Post).order_by(models.Post.created_at.desc()).all()
    return posts
