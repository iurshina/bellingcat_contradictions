import chromadb
from chromadb.utils import embedding_functions

import spacy

import os

from utils import setup_logger

logger = setup_logger('db_logger', 'app.log')


nlp = spacy.load('en_core_web_sm')
client = chromadb.PersistentClient(path="db/")


def create_collection(collection_name: str, path: str):
    # https://www.sbert.net/docs/pretrained_models.html
    sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="paraphrase-multilingual-mpnet-base-v2")

    try:
        collection = client.create_collection(name=collection_name, embedding_function=sentence_transformer_ef)
    except:
        # TODO: add stacktrace
        logger.error("The collection already exists")

    for filename in os.listdir(path):
        file = os.path.join(path, filename)
        with open(file) as f:
            for row in f:
                # TODO: check how a row looks like, create one string out of a file?
                doc = nlp(row)

                sentences = [sent.text for sent in doc.sents]
                documents, metadatas, ids = [], [], []
                for i, s in enumerate(sentences):
                    documents.append(s)
                    metadatas.append({"filename": filename, "sent_n": i})
                    ids.append(filename + "_" + str(i))

                collection.add(
                    documents=documents,
                    metadatas=metadatas,
                    ids=ids
                )

    logger.info(f'All data for the collection {collection_name} have been loaded.')


def fetch_data_for_topic(topic: str, collection_name: str):
    sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="paraphrase-multilingual-mpnet-base-v2")

    collection = client.get_collection(name=collection_name, embedding_function=sentence_transformer_ef)

    results = collection.query(
        query_texts=[topic],
        n_results=20,
        # include=[ "documents", "embeddings" , "distances"]
    )   

    return results["documents"][0]


def all_collections():
    return client.list_collections()