import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer

# Load saved model, vectorizer, and selected features
with open("sentiment_model.pkl", "rb") as model_file:
    final_model = pickle.load(model_file)
with open("vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)
with open("selected_features.pkl", "rb") as features_file:
    selected_features = pickle.load(features_file)

# Define selected emotions
selected_emotions = [ "anger", "desire", "disgust", "fear", "grief","joy", "love"]
# Function to analyze user input
def analyze_text(text):
    user_input_vect = vectorizer.transform([text]).toarray()
    user_input_selected = user_input_vect[:, selected_features]
    prediction_proba = final_model.predict_proba(user_input_selected)
    # return [0.1, 0.3, 0.12 ,0.1, 0.2, 0.7, 0.4] 
    return [prediction_proba[0][i]*10 for i in range(len(selected_emotions))]




















# def analyze_user_input():
#     user_input = input("Enter a sentence to analyze its emotion: ")
#     user_input_vect = vectorizer.transform([user_input]).toarray()
#     user_input_selected = user_input_vect[:, selected_features]
#     prediction = final_model.predict(user_input_selected)
#     prediction_proba = final_model.predict_proba(user_input_selected)  # Get probabilities

#     # Output probabilities for selected emotions
#     emotion_scores = {selected_emotions[i]: prediction_proba[0][i] for i in range(len(selected_emotions))}
#     scores = [x for x in emotion_scores.values()]

#     return scores
