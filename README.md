# Contradictions Finder

This is a project developed during Bellingcat hackathon Fall 2023. 

Team name: Bienenstich (Anastasiia Iurshina and Kristina Nedzvetskaia)

The project aims to find contradictions in multilingual textual data. The intended use case was finding contradictions in news data.

One can create a folder with text data in different formats (.txt at the memoment). The texts are split into sentenses and stored in a vector database (chromaDB), then one can provide a topic or a statement for which we will look for contradictions. Related statements will be found in the DB and then the pairs given to a LLM (currently OpenAI's API, chatgpt-3.5) to detect contradictions. After this, the detected contradictions with some context are displayed on the UI.

![Project](Contr.png)

Note: the current demo works with a very limited dataset (10 short articles). 

# How to run the project 

Follow be's README.md to install and run it

TODO

# TODOs

Add more extensive preprocessing to remove too short sentences, errors of parsing, etc

Add callbacks from backend to UI, scheduler for tasks

Make the prompt and model names configurable through a config file

Add more file formats: PDFs, CSVs...

Try other embeddings for the vector database (probably OpenAI's would work best)

Add more context to documents

# Future work

Switch to a fine-tuned opensource model, like Llama2 quanized and possibly fine-tuned on OpenAI's output

Detect and offer topics for the loaded data instead of entering a topic

Add feedback loop from the user, to show if these are the contradictions or not.
