# SmartFeedAI
SmartFeedAi is uses AI to helps users browse through online content efficiently. It uses NLP AI algorithms to generate a short summary of an article's content when users input a URL. 

Personal blogs provide a unique perspective that AI cannot replicate. Contrary to fear-mongering that blogging will see a decline because of Ai, Ai can assist readers who love online reading by providing short summaries of articles that they might be interested in, this is what SmartFeedAi does.

### To run the docker image of this application: `docker run --rm -p 3000:3000 avionmission/smartfeedai:latest`

## Getting Started

In the project directory, you can run:

Run `npm install` to install all the dependencies.

To install all dependencies in backend, open a separate terminal:
1. Go to api directory by command `cd api`
2. Create a virtual environment `python -m venv venv`
3. Run `. venv/bin/activate` to start the virtual environment
4. Run `pip install -r requirements.txt`

To start the app on a gunicorn web server:
5. Run `pip install gunicorn` 
6. To start the server run `gunicorn -b :3000 api:app` and the app should be running at localhost:5000

To build a docker image:
7. Install docker on your linux system if it's not already installed using these instructions: (https://docs.docker.com/engine/install/ubuntu/)[https://docs.docker.com/engine/install/ubuntu/]
8. To build docker image: `docker build -f Dockerfile -t smartfeedai`
9. To run the docker image: `docker run --rm -p 3000:3000 smartfeedai`
