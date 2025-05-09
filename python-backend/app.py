from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# MongoDB connection
try:
    client = MongoClient('mongodb+srv://cyasiaseeya:1234@scla.ahfumg7.mongodb.net/')
    # Test the connection
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise

db = client.scla
users = db.users
openai.api_key = os.getenv('OPENAI_API_KEY')
print("OPENAI_API_KEY:", os.getenv('OPENAI_API_KEY'))
openai.api_base = "https://api.openai.com/v1"
# Flask app setup
app = Flask(__name__)
CORS(app, 
     resources={r"/*": {
         "origins": ["http://localhost:3000"],
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization"],
         "supports_credentials": True
     }}
)

socketio = SocketIO(
    app,
    cors_allowed_origins=["http://localhost:3000"],
    ping_timeout=60,
    ping_interval=25,
    async_mode='threading',
    logger=True,
    engineio_logger=True
)

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'name']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Check if user already exists
        if users.find_one({'email': data['email']}):
            return jsonify({'error': 'User already exists'}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        
        # Create user document
        user_doc = {
            'email': data['email'],
            'password': hashed_password,
            'name': data['name']
        }
        
        # Insert user into database
        result = users.insert_one(user_doc)
        
        return jsonify({
            'message': 'User registered successfully',
            'user_id': str(result.inserted_id)
        }), 201
        
    except Exception as e:
        print(f"Error in register endpoint: {e}")
        return jsonify({'error': str(e)}), 500

# Chat endpoints
@app.route('/api/chat/group-chat/messages', methods=['GET'])
def get_messages():
    try:
        data = request.get_json()
        if not data or not data.get("message"):
            return jsonify({"error": "Message is required"}), 400

        user_message = data.get("message")

        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "명료한 챗봇입니다."},
                {"role": "user", "content": user_message}
            ]
        )

        reply = response.choices[0].message.content
        return jsonify({"response": reply})
        print(reply)
    except Exception as e:
        print(f"Error handling message: {e}")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=True) 