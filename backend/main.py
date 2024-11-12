from fastapi import FastAPI

from classify_tweet import classify_tweet

app = FastAPI()


@app.get("/classify_tweet")
def read_root(tweet: str):
    """
    Classify tweets using the trained model
    """
    return classify_tweet(tweet)