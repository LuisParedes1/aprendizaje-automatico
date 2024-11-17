"""
Classify tweets using the trained model
"""

import pickle
from typing import Dict, List, Any
import re
from nltk.corpus import stopwords
import nltk
from fastapi import HTTPException

MODEL_NAMES: List[str] = ["logistic_regression_model", "multinomial_nb_model", "extra_trees_model"]

class TweetEmotionPredictor:
    """
    Tweet Emotion Predictor class
    """
    models: dict[str, Any] = {}

    def __init__(self): 

        for model_name in MODEL_NAMES:
            with open(f'./ML/models/{model_name}.pkl', 'rb') as file:
                self.models[model_name] = pickle.load(file)

        with open('./ML/tfidf_vectorizer.pkl', 'rb') as f:
            self.vectorizer = pickle.load(f)

        nltk.download('stopwords')
        self.stopwords_set = set(stopwords.words('english'))

    def preprocess_text(self, text):
        """
        String pre-processing function
        """
        if not isinstance(text, str):
            text = ""
        text = re.sub(r"http\S+|@\w+|#\w+|[^A-Za-z\s]", "", text.lower())
        return ' '.join([word for word in text.split() if word not in self.stopwords_set])


    def predict_tweet(self, tweet: str, model_name: str) -> Dict[str, str]:
        """
        Classify Tweets into one of the 5 categories
        """
        if (model_name not in MODEL_NAMES):
            raise HTTPException(status_code=401, detail="Unauthorized: Model name not found") 

        tweets_to_predict_clean: List[str] = [self.preprocess_text(tweet)]
        tweets_to_predict_vectorized = self.vectorizer.transform(tweets_to_predict_clean)

        emotion_map: Dict[int, str] = {0: 'sadness', 1: 'joy', 2: 'love', 3: 'anger', 4: 'fear', 5: 'surprise'}
        predictions = self.models[model_name].predict(tweets_to_predict_vectorized)

        predicted_emotions: List[str] = [emotion_map.get(label, "Unknown") for label in predictions]

        return {
            "tweet": tweet,
            "emotion": predicted_emotions.pop()
        }
