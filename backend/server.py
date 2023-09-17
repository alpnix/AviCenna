from flask import Flask
from model import chatbot
from flask import request
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)

@app.route("/model", methods=['POST'])
def call_model():
    request_data = request.get_json()
    input = request_data['input']
    output = chatbot(input)
    return jsonify({'message':output})
    
    
if __name__ == "__main__":
    app.run(debug=False, port=5000)