from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os

app = FastAPI()

class DirectoryPath(BaseModel):
    path: str

class ModelRequest(BaseModel):
    model_type: str
    topic: str

@app.post("/load-data/")
def load_data(directory: DirectoryPath):
    if not os.path.exists(directory.path):
        raise HTTPException(status_code=404, detail="Directory not found")
    # TODO
    return {"message": "Data loaded successfully"}

@app.post("/process/")
def process(request: ModelRequest):
    # TODO
    return {"model_type": request.model_type, "topic": request.topic, "data": ["data1", "data2", "data3"]}