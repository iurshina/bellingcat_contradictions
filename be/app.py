from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

from db import all_collections, create_collection, fetch_data_for_topic, fetch_context
from contradictions_detector import detect_contradictions


app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:8080/",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5173/",
    "http://localhost:5173/",
    "http://localhost:5173",
    "http://localhost:8080/"
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
    # TODO: doesn't seem to be background -_-
    background_tasks.add_task(create_collection(collection_name=request.collection_name, path=request.path))
    return {"message": "Data starting to load"}

#  {
#   "model_type": "openAI",
#   "topic": "аль-Заркави",
#   "collection_name": "cont_only"
# }

@app.post("/process/")
def process(request: ModelRequest):
    documents, metadatas = fetch_data_for_topic(collection_name=request.collection_name, topic=request.topic)
    contradictions = detect_contradictions(documents=documents, metadatas=metadatas, model_type=request.model_type)
    contr_in_context = fetch_context(request.collection_name, contradictions)
    print(contr_in_context)
    return {"model_type": request.model_type, "topic": request.topic, "data": contr_in_context}                                                                              "Это решение вызвало широкий резонанс в обществе и среди политических деятелей."], 2)]}


@app.get("/collections/")
def collections():
    return all_collections()