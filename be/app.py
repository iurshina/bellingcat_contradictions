from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

from db import all_collections, create_collection, fetch_data_for_topic
from contradictions_detector import detect_contradictions


app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DirectoryPath(BaseModel):
    path: str
    collection_name: str

class ModelRequest(BaseModel):
    model_type: str
    topic: str
    collection_name: str


@app.post("/load-data/")
async def load_data(background_tasks: BackgroundTasks, request: DirectoryPath):
    if not os.path.exists(request.path):
        raise HTTPException(status_code=404, detail="Directory not found")
    background_tasks.add_task(create_collection(collection_name=request.collection_name, path=request.path))
    return {"message": "Data starting to load"}


@app.post("/process/")
def process(request: ModelRequest):
    documents = fetch_data_for_topic(collection_name=request.collection_name, topic=request.topic)
    # TODO: figure out llama2 - now it fails on my machine
    # TODO: make it async/kafka or sth?
    # contradictions = detect_contradictions(documents=documents, model_type=request.model_type)
    return {"model_type": request.model_type, "topic": request.topic, "data": [("Statement", "Contr statement")]}


@app.get("/collections/")
def collections():
    return all_collections()