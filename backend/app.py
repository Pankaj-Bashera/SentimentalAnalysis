from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

@app.route('/favicon.ico')
def favicon():
    return '', 204  # No Content

@app.route('/send-text', methods=['POST'])
def send_text():
    data = request.json
    text = data.get('text')
    
    if text:
        app.logger.info(f"Received text: {text}")
        
        # Save the text to a file
        with open("messages.txt", "a", encoding="utf-8") as file:
            file.write(text + "\n")  # Append text with a newline

        return jsonify({"message": "Text saved successfully!"}), 200
    else:
        return jsonify({"error": "No text provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
