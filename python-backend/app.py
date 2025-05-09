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
messages = db.messages

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
        room_messages = list(messages.find({'room': 'group-chat'}).sort('timestamp', -1).limit(50))
        messages_list = []
        for msg in room_messages:
            msg['_id'] = str(msg['_id'])
            msg['timestamp'] = msg['timestamp'].isoformat()
            messages_list.append(msg)
        print(f"Fetched {len(messages_list)} messages")
        return jsonify(messages_list)
    except Exception as e:
        print(f"Error fetching messages: {e}")
        return jsonify({'error': str(e)}), 500

# WebSocket events
@socketio.on('connect')
def handle_connect():
    print(f"Client connected: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    print(f"Client disconnected: {request.sid}")

@socketio.on('join')
def on_join(data):
    try:
        room = data['room']
        join_room(room)
        print(f"User {data['username']} joined {room}")
        emit('status', {'msg': f"{data['username']} has joined the chat."}, room=room)
    except Exception as e:
        print(f"Error in join event: {e}")

@socketio.on('leave')
def on_leave(data):
    try:
        room = data['room']
        leave_room(room)
        print(f"User {data['username']} left {room}")
        emit('status', {'msg': f"{data['username']} has left the chat."}, room=room)
    except Exception as e:
        print(f"Error in leave event: {e}")

@socketio.on('message')
def handle_message(data):
    try:
        room = data['room']
        message = {
            'room': room,
            'user_id': data['user_id'],
            'username': data['username'],
            'content': data['message'],
            'timestamp': datetime.utcnow()
        }
        print(f"Received message: {message}")
        result = messages.insert_one(message)
        message['_id'] = str(result.inserted_id)
        message['timestamp'] = message['timestamp'].isoformat()
        emit('message', message, room=room)
    except Exception as e:
        print(f"Error handling message: {e}")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=True) 