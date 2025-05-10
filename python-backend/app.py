from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt
import openai
from datetime import datetime

# Load environment variables
load_dotenv()

# MongoDB connection
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb+srv://cyasiaseeya:1234@scla.ahfumg7.mongodb.net/scla?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true&connectTimeoutMS=30000&socketTimeoutMS=30000')

try:
    client = MongoClient(
        MONGODB_URI,
        serverSelectionTimeoutMS=30000,
        connectTimeoutMS=30000,
        socketTimeoutMS=30000,
        maxPoolSize=50,
        minPoolSize=10,
        maxIdleTimeMS=30000
    )
    # Test the connection
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise

db = client.scla
users = db.users

messages = db.messages
openai.api_key = os.getenv('OPENAI_API_KEY')
print("OPENAI_API_KEY:", os.getenv('OPENAI_API_KEY'))
openai.api_base = "https://api.openai.com/v1"
# Flask app setup
app = Flask(__name__)
# 🔥 CORS 설정 수정
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "https://hackathon-git-master-tafwhs-projects.vercel.app",
            "hackathon-9oyywzz2w-tafwhs-projects.vercel.app",  # Vercel에서 실제 배포된 주소!
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

# 🔥 cors_allowed_origins 도 위에서와 똑같이!
socketio = SocketIO(
    app,
    cors_allowed_origins=[
        "http://localhost:3000",
        "https://hackathon-git-master-tafwhs-projects.vercel.app",
        "hackathon-9oyywzz2w-tafwhs-projects.vercel.app"
    ],
    async_mode='threading',
    logger=True,
    engineio_logger=True,
    ping_timeout=60,
    ping_interval=25,
    max_http_buffer_size=1e8,
    allow_upgrades=True,
    always_connect=True
)

# WebSocket events
@socketio.on('connect')
def handle_connect():
    print(f"Client connected: {request.sid}")
    return True

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
        return False

@socketio.on('leave')
def on_leave(data):
    try:
        room = data['room']
        leave_room(room)
        print(f"User {data['username']} left {room}")
        emit('status', {'msg': f"{data['username']} has left the chat."}, room=room)
    except Exception as e:
        print(f"Error in leave event: {e}")
        return False

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
        return False

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

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or not data.get("message"):
            return jsonify({"error": "Message is required"}), 400

        user_message = data.get("message")
        partner_id = data.get("partnerId")
        partner_name = data.get("partnerName")
        partner_role = data.get("partnerRole")

        # 파트너 정보를 시스템 메시지에 포함
        system_message = f"당신은 {partner_name}입니다. {partner_role} 역할을 맡고 있습니다. 이 역할에 맞는 대화를 해주세요."
        
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ]
        )

        reply = response.choices[0].message.content
        return jsonify({"response": reply})
        print(reply)
    except Exception as e:
        print("❌ 오류 발생:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/scenarios", methods=["POST"])
def scenario_chat():
    try:
        data = request.get_json()
        if not data or not data.get("message"):
            return jsonify({"error": "Message is required"}), 400

        user_message = data.get("message")
        
        scenario_id    = data.get("scenarioId")
        character_name = data.get("characterName")
        character_role = data.get("characterRole")

        # 파트너 정보를 시스템 메시지에 포함
        system_message = (
            f"당신은 시나리오 `{scenario_id}`에 등장하는 "
            f"{character_name}이고, 역할은 `{character_role}`입니다. "
            "이 역할에 맞추어 대답해주세요."
        )
        
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ]
        )

        reply = response.choices[0].message.content
        return jsonify({"response": reply})
        print(reply)
    except Exception as e:
        print("❌ 오류 발생:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/chat/group-chat/messages', methods=['GET'])
def get_messages():
    try:
        # Get messages from MongoDB
        chat_messages = list(messages.find({'room': 'group-chat'}).sort('timestamp', -1).limit(50))
        
        # Convert ObjectId to string and format timestamp
        for msg in chat_messages:
            msg['_id'] = str(msg['_id'])
            msg['timestamp'] = msg['timestamp'].isoformat()
        
        return jsonify(chat_messages)
    except Exception as e:
        print(f"Error fetching messages: {e}")
        return jsonify({'error': str(e)}), 500

@app.route("/")
def index():
    return "✅ Flask 백엔드가 정상적으로 작동 중입니다!"


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=int(os.environ.get("PORT", 8000)), debug=True, allow_unsafe_werkzeug=True)

