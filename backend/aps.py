from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from main import analyze_text  # Import function

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

@app.route('/send-text', methods=['POST'])
def send_text():
    data = request.json
    text = data.get('text')

    if text:
        app.logger.info(f"Received text: {text}")

        # Save text
        with open("messages.txt", "a", encoding="utf-8") as file:
            file.write(text + "\n")

        # Analyze sentiment
        sentiment_scores = analyze_text(text)

        return jsonify({"sentiment": sentiment_scores}), 200
    else:
        return jsonify({"error": "No text provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
