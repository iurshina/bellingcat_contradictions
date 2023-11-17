import chromadb
from chromadb.utils import embedding_functions

import spacy

import os

from utils import setup_logger

logger = setup_logger('db_logger', 'app.log')


nlp = spacy.load('en_core_web_sm')
client = chromadb.PersistentClient(path="db/")

# https://www.sbert.net/docs/pretrained_models.html
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="paraphrase-multilingual-mpnet-base-v2")
# OpenAI embeddigs

def create_collection(collection_name: str, path: str):
    try:
        collection = client.create_collection(name=collection_name, embedding_function=sentence_transformer_ef)
    except:
        # TODO: add stacktrace
        logger.error("The collection already exists")

    for filename in os.listdir(path):
        file = os.path.join(path, filename)
        with open(file) as f:
            for ri, row in enumerate(f):
                # TODO: check how a row looks like, create one string out of a file?
                doc = nlp(row)

                sentences = [sent.text for sent in doc.sents]
                documents, metadatas, ids = [], [], []
                for i, s in enumerate(sentences):
                    documents.append(s)
                    metadatas.append({"filename": filename, "row_n": ri, "sent_n": i})
                    ids.append(filename +  "_" + str(ri) + "_" + str(i))

                collection.add(
                    documents=documents,
                    metadatas=metadatas,
                    ids=ids
                )

    logger.info(f'All data for the collection {collection_name} have been loaded.')


def fetch_data_for_topic(topic: str, collection_name: str):
    collection = client.get_collection(name=collection_name, embedding_function=sentence_transformer_ef)

    results = collection.query(
        query_texts=[topic],
        n_results=4,
        # include=[ "documents", "metadata"]
    )   

    # print(results)
    # print(results["documents"][0], results["metadatas"][0])

    return results["documents"][0], results["metadatas"][0]


def all_collections():
    return client.list_collections()


def fetch_context(collection_name: str, contradictions):
    res = []
    for c1, c2 in contradictions:
        filename = c1[1]["filename"]
        row_n = c1[1]["row_n"]
        sent_n = c1[1]["sent_n"]

        filename2 = c2[1]["filename"]
        row_n2 = c2[1]["row_n"]
        sent_n2 = c2[1]["sent_n"]

        cnt1_in_ctx = None
        with open("data/" + collection_name + "/" + filename) as f:
            for i, r in enumerate(f):
                if i == row_n:
                    doc = nlp(r)
                    sentences = [sent.text for sent in doc.sents]
                    
                    cnt1_in_ctx = (sentences, sent_n)

                    break
        
        cnt2_in_ctx = None
        with open("data/" + collection_name + "/" + filename2) as f:
            for i, r in enumerate(f):
                if i == row_n2:
                    doc = nlp(r)
                    sentences = [sent.text for sent in doc.sents]
                    
                    cnt2_in_ctx = (sentences, sent_n2)

                    break
        
        res.append((cnt1_in_ctx, cnt2_in_ctx))

    print(res)

    return res


def add_extra_data():
    collection = client.get_collection(name="lenta_smaller", embedding_function=sentence_transformer_ef)

    documents, metadatas, ids = [], [], []
    with open("data/lenta/Some_contr_En.txt") as f:
        for ri, l in enumerate(f):
            doc = nlp(l)

            sentences = [sent.text for sent in doc.sents]
            for i, s in enumerate(sentences):
                documents.append(s)
                metadatas.append({"filename": "Some_contr_En.txt", "row_n": ri, "sent_n": i})
                ids.append("Some_contr_En.txt" +  "_" + str(ri) + "_" + str(i))

                collection.add(
                    documents=documents,
                    metadatas=metadatas,
                    ids=ids
                )

if __name__ == "__main__":
    add_extra_data()