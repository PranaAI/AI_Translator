import os
import vertexai
from vertexai.generative_models import (
    GenerationConfig,
    GenerativeModel,
    HarmBlockThreshold,
    HarmCategory,
)
import logging

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')


class VertexAIWrapper:
    def __init__(self, project_id: str, location: str,
                 model_id: str = "gemini-1.5-pro-002"):
        self.project_id = project_id
        self.location = location
        self.model_id = model_id
        self.model = None

    def initialize(self):
        """Initializes the Vertex AI environment."""
        try:
            vertexai.init(project=self.project_id, location=self.location)
            self.model = GenerativeModel(self.model_id)
            logging.info(
                f"Vertex AI initialized successfully in {self.location} with model {self.model_id}")
        except Exception as e:
            logging.error(f"Error initializing Vertex AI: {e}")
            raise

    def count_tokens(self, content: str) -> int:
        """Counts the number of tokens in the given content."""
        if not self.model:
            raise ValueError("Vertex AI model not initialized.")
        return self.model.count_tokens(content).total_tokens


def translate_with_gemini(
        prompt: str,
        system_instruction: list = None,
        project_id: str = "ai-translator-444310",
        location: str = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1"),
        model_id: str = "gemini-1.5-pro-002",
        temperature: float = 0.9,
        top_p: float = 1.0,
        top_k: int = 32,
        max_output_tokens: int = 8192,
):
    """
    Translates a given text using Gemini Pro 1.5.

    Args:
        prompt (str): The input text to be translated.
        system_instruction (list): A list of instructions to the model.
        project_id (str): Google Cloud project ID.
        location (str): Google Cloud region (default: us-central1).
        model_id (str): The Gemini model ID to use.
        temperature (float): Sampling temperature.
        top_p (float): Nucleus sampling parameter.
        top_k (int): Top-k sampling parameter.
        max_output_tokens (int): Max tokens in output.

    Returns:
        dict: A dictionary containing the translated text, usage metadata,
              finish reason, and safety ratings.
    """

    # Initialize Vertex AI
    vertex_ai_wrapper = VertexAIWrapper(project_id, location, model_id)
    try:
        vertex_ai_wrapper.initialize()
    except Exception as e:
        logging.error(f"Failed to initialize Vertex AI: {e}")
        raise

    # Set generation config
    generation_config = GenerationConfig(
        temperature=temperature,
        top_p=top_p,
        top_k=top_k,
        candidate_count=1,
        max_output_tokens=max_output_tokens,
    )

    # Set safety settings
    safety_settings = {
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    }

    # Create prompt content
    contents = [prompt]

    try:
        # Counts tokens
        input_token_count = vertex_ai_wrapper.count_tokens(contents)
        logging.info(f"Input token count: {input_token_count}")

        # Generate content
        model = GenerativeModel(model_name=model_id,
                                system_instruction=system_instruction)
        response = model.generate_content(
            contents,
            generation_config=generation_config,
            safety_settings=safety_settings,
        )
        output = response.text

        # Count output tokens
        output_token_count = vertex_ai_wrapper.count_tokens(output)
        logging.info(f"Output token count: {output_token_count}")

        # Prepare response dictionary
        response_data = {
            "translated_text": response.text,
            "usage_metadata": response.usage_metadata,
            "finish_reason": response.candidates[0].finish_reason,
            "safety_ratings": response.candidates[0].safety_ratings,
        }
        return response_data

    except Exception as e:
        logging.exception(f"Error during translation: {e}")
        raise


if __name__ == "__main__":
    # Example Usage (Remember to set GOOGLE_APPLICATION_CREDENTIALS)
    english_text = "The dog jumps over the lazy fox"
    custom_instructions = [
        "You are a translator specializing in children's stories from English to Tamil.",
        "Use simple and clear language that is suitable for young children.",
        "Be very literal with the translation.",
    ]

    try:
        translation_result = translate_with_gemini(
            english_text, system_instruction=custom_instructions
        )
        print(f"\nTranslated Text:\n{translation_result['translated_text']}")
        print(f'\nUsage metadata:\n{translation_result["usage_metadata"]}')
        print(f"\nFinish reason:\n{translation_result['finish_reason']}")
        print(f"\nSafety settings:\n{translation_result['safety_ratings']}")
    except Exception as e:
        print(f"Error: {e}")
