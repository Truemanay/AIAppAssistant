import asyncio
import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_functions import AssistantClient

os.environ["OPENAI_API_KEY"] = "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"



app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route("/")
def hello_world():
    return "Hello Fred!!!"


@app.route("/submit-data", methods=["POST"])
def submit_data():
    data = request.json  # This assumes you're sending JSON data
    fuzzy = AssistantClient("asst_oXEAQtwxNDGMiAsafnqu7457")\
    
    ai_actions = []
    def execute_action(actionArray):
        print("Processing UI Navigation" + str(actionArray))
        ai_actions.extend(actionArray)
        return "Done"

    fuzzy.add_function(execute_action)
    print(data)  # Do something with the data
    response = asyncio.run(fuzzy(json.dumps(data)))
    print(response)
    print(ai_actions)
    return jsonify({"functions": json.dumps(ai_actions), "message": "Data received successfully!"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5001)
