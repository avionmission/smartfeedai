# SmartFeedAI
SmartFeedAi is uses AI to helps users browse through online content efficiently. It uses NLP AI algorithms to generate a short summary of an article's content when users input a URL. 

Personal blogs provide a unique perspective that AI cannot replicate. Contrary to fear-mongering that blogging will see a decline because of Ai, Ai can assist readers who love online reading by providing short summaries of articles that they might be interested in, this is what SmartFeedAi does.

Demo video: [Link](https://youtu.be/KuWdanSs7Bg)

### Old Version with Flask Backend: [old-smartfeedai](https://github.com/avionmission/smartfeedai/tree/42e8289e53c68207f09388dc72f8fbda760c689a)

# How to Use?
1. Clone this repo
2. Create a MindsDB cloud account - you can get your free account [here](https://cloud.mindsdb.com/). 
3. Create a model in your MindsDB cloud editor and run the query:
    
    ```sql
    CREATE MODEL text_summary
    PREDICT text_summary
    USING
    engine = 'openai',
    model_name = 'gpt-4',
    input_column = 'text_long',
    max_tokens = 200,
    prompt_template = 'Summarize the following text, but only enough to inspire intrigue. text:{{text_long}}';
    ```
4. To start the backend use:

    ```bash
    cd smartfeedai/api
    MINDSDB_USER=<email> MINDSDB_PASS=<password> npm start
    ```
5. To start the frontend use:

    ```bash
    cd smartfeedai
    npm start
    ```
6. That's it! 🎉🎉 Now you can use SmartFeed.ai on your localhost 3000.

Here's the hashnode article explaining [the story, engineering and vision behind Smartfeedai](https://avionmission.hashnode.dev/building-an-ai-saas-with-mindsdb) 
