# Contradictions Finder

This is a project developed during Bellingcat hackathon Fall 2023. 

It aims to find contradictions in multilingual textual data. One can create a folder with text data in different formats (.txt, .pdf.). It is split into sentenses and stored in a vector database (chromaDB), then one can provide a topic or a statements for which we will look for contradictions. Related statements will be find in the DB and then the pairs given into LLM to detect contradictions. After this, the contradictions with context are displayed on the UI.


# TODOs

Add more data, more examples, add some preprocessing to remove too short sentences, etc

TODOs from code (Background tasks, callbacks to the UI, Kafka)

TODOs from code (Take prompt to a file to make configurable)

Add more file formats: PDFs, CSVs...

Try other embeddings, the current ones don't seem to be awesome

Add more context to documents


# Future work

Switch to a fine-tuned opensource model, like Llama2

Detect and offer topics for the loaded data?

Add feedback loop from the user, to show if these are the contradictions or not.