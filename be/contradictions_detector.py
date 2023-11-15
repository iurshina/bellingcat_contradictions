from langchain.llms import LlamaCpp
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

import itertools

from utils import setup_logger


logger = setup_logger('contr_detector_logger', 'app.log')


# TODO: use OpenAI API

callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])
llm_llama = LlamaCpp(
        # model_path="llama-2-7b.Q4_K_M.gguf",
        model_path="models/OpenOrca-Platypus2-13B-Q4_K_M.gguf",
        temperature=0,
        max_tokens=1000,
        top_p=3,
        callback_manager=callback_manager,
        verbose=True,  # Verbose is required to pass to the callback manager
    )

def detect_contradictions(documents, model_type: str):
    contrs = []
    for doc1, doc2 in itertools.combinations(documents, 2):
        # TODO: move the prompt to a file to be configured
        prompt = f"""
            Statement 1: {doc1}
            Statement 2: {doc2}

            Question: Are these two statements contradictory? Answer "yes" or "no".
        """

        print("Prompt: " + prompt)

        if model_type == "openAI":
            llm = None
        else: 
            llm = llm_llama

        if "yes" in llm(prompt).lower():
            logger.info(f"Contradiction: {doc1} {doc2}")
            print(f"Contradiction: {doc1} {doc2}")
            # TODO: fetch context by metadata
            contrs((doc1, doc2))
        else:
            logger.info(f"No contradiction: {doc1} {doc2}")
            print(f"No contradiction: {doc1} {doc2}")
    
    return contrs
