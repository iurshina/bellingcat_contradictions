from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import os

from db import all_collections, create_collection, fetch_data_for_topic, fetch_context
from contradictions_detector import detect_contradictions


app = FastAPI()

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

 # возраст выхода на пенсию
@app.post("/process/")
def process(request: ModelRequest):
    documents, metadatas = fetch_data_for_topic(collection_name=request.collection_name, topic=request.topic)
    # contradictions = detect_contradictions(documents=documents, metadatas=metadatas, model_type=request.model_type)
    # contr_in_context = fetch_context(request.collection_name, contradictions)
    # print(contr_in_context)
    # return {"model_type": request.model_type, "topic": request.topic, "data": contr_in_context}
    return {"model_type": request.model_type, "topic": request.topic, "data": [(["Важные новости для российских пенсионеров и будущих пенсионеров были объявлены сегодня президентом России.", 
                                                                                 "В ходе специальной пресс-конференции, президент сообщил о стабильности пенсионной системы и уверил граждан, что в настоящее время нет планов по повышению возраста выхода на пенсию."], 1), 
                                                                                 (["Вчера, президент России Владимир Путин объявил о важном решении, которое затронет миллионы граждан страны.", 
                                                                                   "В ходе телевизионного выступления он подчеркнул, что пенсионный возраст будет постепенно повышаться.", 
                                                                                   "Это решение вызвало широкий резонанс в обществе и среди политических деятелей."], 2)]}

@app.get("/collections/")
def collections():
    return all_collections()