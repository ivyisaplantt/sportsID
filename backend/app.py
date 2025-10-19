from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def read_json(file):
    with open(os.path.join(DATA_DIR, file), "r") as f:
        return json.load(f)

def write_json(file, data):
    with open(os.path.join(DATA_DIR, file), "w") as f:
        json.dump(data, f, indent=2)

@app.route("/api/programs", methods=["GET"])
def get_programs():
    return jsonify(read_json("programs.json"))

@app.route("/api/family", methods=["POST"])
def create_family():
    families = read_json("families.json")
    new = request.json
    families.append(new)
    write_json("families.json", families)
    return jsonify({"message": "Family registered successfully"})

if __name__ == "__main__":
    app.run(debug=True)
