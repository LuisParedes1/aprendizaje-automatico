"""
Classify tweets using the trained model
"""

import pickle
from typing import Dict, List
import re
from nltk.corpus import stopwords
import nltk

with open('./ML/models/logistic_regression_model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('./ML/tfidf_vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

nltk.download('stopwords')
stopwords_set = set(stopwords.words('english'))

def preprocess_text(text):
    """
    String pre-processing function
    """
    if not isinstance(text, str):
        text = ""
    text = re.sub(r"http\S+|@\w+|#\w+|[^A-Za-z\s]", "", text.lower())
    return ' '.join([word for word in text.split() if word not in stopwords_set])


def classify_tweet(tweet: str) -> Dict[str, str]:
    """
    Classify Tweets into one of the 5 categories
    """

    tweets_to_predict_clean: List[str] = [preprocess_text(tweet)]
    tweets_to_predict_vectorized = vectorizer.transform(tweets_to_predict_clean)

    emotion_map: Dict[int, str] = {0: 'sadness', 1: 'joy', 2: 'love', 3: 'anger', 4: 'fear', 5: 'surprise'}
    predictions = model.predict(tweets_to_predict_vectorized)

    predicted_emotions: List[str] = [emotion_map.get(label, "Unknown") for label in predictions]

    return {
        "tweet": tweet,
        "emotion": predicted_emotions.pop()
    }
