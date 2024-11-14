# Twitter Emotional Classifier

The following project takes the tweets from the [Twitter Emotion Classification Datase](https://www.kaggle.com/datasets/aadyasingh55/twitter-emotion-classification-dataset/data) and trains a classifier model that labels a tweet in one of the following 5 categories

| Index | Emotion  |
| ----- | -------- |
| 0     | sadness  |
| 1     | joy      |
| 2     | love     |
| 3     | anger    |
| 4     | fear     |
| 5     | surprise |

We evaluated with the following classification [models](./backend/ML/models/)

- Logistic Regression Classifier
- Multinomial Naive Bayes Classifier
- Extra Trees Classifier

# Frontend

Simple Next.js project to use as new Tweet input

To run the frontend, inside `/frontend` folder, run:

```
npm run dev
```

Then go to `http://localhost:3000/`

# Backend

The backend uses the trained model along with the vectorizer to classify the Tweet.

To run the backend, inside `/backend` folder, run:

```
fastapi dev main.py
```

Then go to `http://127.0.0.1:8000/docs`

# Running with docker-compose

You can also run the project using docker-compose. Fron root folder run:

```
docker-compose build
```

Then run

```
docker-compose up
```
