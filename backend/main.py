import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import predict_tweet


app = FastAPI()
logging.basicConfig(level=logging.INFO)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_tweet.router)