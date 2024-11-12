# predict_tweet.py
"""
Place holder router.
"""
from fastapi import APIRouter
from model.predictor import TweetEmotionPredictor


router = APIRouter(
    tags=["Predict"],
)

model = TweetEmotionPredictor()


@router.get("/predict", summary="Predict Tweet Emotion")
def predict(tweet: str):
    """
    Classify tweets using the trained model
    """
    return model.predict_tweet(tweet)