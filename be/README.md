# How to run the backend

> pip install -r requirements.txt

> python -m spacy download en_core_web_sm

> uvicorn app:app --reload --host localhost --port 8080

Then you will have the backend running at http://127.0.0.1:8000

Load a model to be/models folder: https://huggingface.co/kroonen/OpenOrca-Platypus2-13B-GGUF