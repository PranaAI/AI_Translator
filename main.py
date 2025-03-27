from fastapi import FastAPI, HTTPException, Body, Request
from pydantic import BaseModel
from typing import List, Optional, Dict
from vertex_ai_translator import translate_with_gemini
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import logging
from fastapi.responses import HTMLResponse, RedirectResponse
from instructions import system_instructions, INSTRUCTIONS_FILE
import json

# Load environment variables from .env file
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()

origins = [
    "http://localhost:8100",
    "http://127.0.0.1:8100",
    "http://0.0.0.0:8100",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/instructions")
async def get_instructions():
    """
    Endpoint to fetch the list of available instructions (value and text only).
    """
    return [{"value": key, "text": details["text"]} for key, details in
            system_instructions.items()]


@app.get("/instructions_details")
async def get_instructions_details():
    """
    Endpoint to fetch the list of available instructions (including all details).
    """
    return system_instructions


@app.get("/instructions/{instruction_id}")
async def get_instruction(instruction_id: str):
    """
    Endpoint to fetch a specific instruction by ID.
    """
    instruction = system_instructions.get(instruction_id)
    if not instruction:
        raise HTTPException(status_code=404, detail="Instruction not found")
    return instruction


# Simplified Model for the request body
class TranslationRequest(BaseModel):
    prompt: str
    instruction_id: str


class TranslationResponse(BaseModel):
    translated_text: str


class InstructionUpdate(BaseModel):
    text: str
    description: str


class InstructionCreate(BaseModel):
    text: str
    description: str


@app.post("/instructions/create-new")  # More descriptive route
async def create_instruction(instruction: InstructionCreate):
    """
    Endpoint to create a new instruction.
    """
    # Find the next available ID
    existing_ids = set(map(int, system_instructions.keys()))  # Convert keys to integers
    next_id = 1
    while next_id in existing_ids:
        next_id += 1
    next_id = str(next_id)  # Convert back to string

    system_instructions[next_id] = instruction.model_dump()

    # Save changes to JSON file
    with open(INSTRUCTIONS_FILE, "w") as f:
        json.dump(system_instructions, f, indent=4)

    return {"message": f"Instruction {next_id} created successfully"}


@app.put("/instructions/{instruction_id}")
async def update_instruction(instruction_id: str, instruction_update: InstructionUpdate):
    """
    Endpoint to update a specific instruction by ID.
    """
    instruction = system_instructions.get(instruction_id)
    if not instruction:
        raise HTTPException(status_code=404, detail="Instruction not found")

    instruction["text"] = instruction_update.text
    instruction["description"] = instruction_update.description

    # Save changes to JSON file
    with open(INSTRUCTIONS_FILE, "w") as f:
        json.dump(system_instructions, f, indent=4)

    return {"message": f"Instruction {instruction_id} updated successfully"}


@app.delete("/instructions/{instruction_id}")
async def delete_instruction(instruction_id: str):
    """
    Endpoint to delete a specific instruction by ID.
    """
    if instruction_id not in system_instructions:
        raise HTTPException(status_code=404, detail="Instruction not found")

    del system_instructions[instruction_id]

    # Save changes to JSON file
    with open(INSTRUCTIONS_FILE, "w") as f:
        json.dump(system_instructions, f, indent=4)

    return {"message": f"Instruction {instruction_id} deleted successfully"}


@app.post("/translate")
async def translate_endpoint(request: TranslationRequest):
    """
    Translates a given text using Gemini Pro 1.5.

    Args:
        request (TranslationRequest): The input request containing the text to translate and the instruction ID.
    Returns:
        TranslationResponse: A dictionary containing the translated text.
    Raises:
        HTTPException: If something goes wrong during the process.
    """
    logging.info(
        f"Received translation request with instruction ID: {request.instruction_id}")

    system_instruction = system_instructions.get(request.instruction_id, {}).get(
        "description")
    if not system_instruction:
        logging.error(f"Invalid instruction ID: {request.instruction_id}")
        raise HTTPException(status_code=400, detail="Invalid instruction ID")

    try:
        response = translate_with_gemini(
            prompt=request.prompt,
            system_instruction=[system_instruction],
            model_id= "gemini-1.5-pro-002",
        )
        return {"translated_text": response["translated_text"]}
    except Exception as e:
        logging.exception(f"Translation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


app.mount("/static", StaticFiles(directory="static", html=True), name="static")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    """
    Redirects the root path to the static index.html file.
    """
    return RedirectResponse("/static/index.html")


if __name__ == "__main__":
    import uvicorn

    # uvicorn.run("main:app", host="0.0.0.0", port=8100)
    uvicorn.run(app, port=8100)  # for localhost
