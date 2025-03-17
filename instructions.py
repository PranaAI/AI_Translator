import json
import os

INSTRUCTIONS_FILE = "instructions.json"

# Load instructions from JSON file
if os.path.exists(INSTRUCTIONS_FILE):
    with open(INSTRUCTIONS_FILE, "r") as f:
        system_instructions = json.load(f)
else:
    # If the file doesn't exist, create an initial dictionary
    system_instructions = {
        "1": {
            "text": "Tamil",
            "description": """You are a creative and engaging Tamil content writer.
                        Your task is to translate content from English to Tamil while ensuring it is culturally relevant and resonates with Tamil-speaking audiences.
                        Maintain the original meaning but adapt the tone to be conversational, engaging, and natural in Tamil.
                        Focus on clarity, readability, and preserving the emotional and cultural nuances of the source content."""
        },
    }
    # Save the initial dictionary to the JSON file
    with open(INSTRUCTIONS_FILE, "w") as f:
        json.dump(system_instructions, f, indent=4)