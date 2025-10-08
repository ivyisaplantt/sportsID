from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
PROGRAMS_FILE = os.path.join(DATA_DIR, 'programs.json')
FAMILIES_FILE = os.path.join(DATA_DIR, 'families.json')

@app.route('/api/programs')
def get_programs():
    with open(PROGRAMS_FILE) as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/api/programs/<int:pid>')
def get_program(pid):
    with open(PROGRAMS_FILE) as f:
        programs = json.load(f)
    for p in programs:
        if p['id'] == pid:
            return jsonify(p)
    return jsonify({'error': 'Program not found'}), 404

@app.route('/api/register', methods=['POST'])
def register():
    payload = request.json
    with open(FAMILIES_FILE, 'r+') as f:
        families = json.load(f)
        families.append(payload)
        f.seek(0)
        json.dump(families, f, indent=2)
    return jsonify({'status': 'ok'})

@app.route('/api/registrations')
def get_registrations():
    with open(FAMILIES_FILE) as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)