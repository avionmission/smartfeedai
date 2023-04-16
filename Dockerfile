# This Dockerfile builds the React client and API together

# Build step #1: build the react front end
FROM node:14-alpine as build-step
WORKDIR /app 
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
COPY ./src ./src 
COPY ./public ./public
RUN npm install 
RUN npm run build  

# Build step #2: build the API with the client as static files
FROM python:3.10
WORKDIR /app
COPY --from=build-step /app/build ./build

RUN mkdir ./api
COPY api/requirements.txt api/api.py api/.flaskenv ./api/
RUN pip install -r ./api/requirements.txt
ENV FLASK_ENV production

EXPOSE 3000
WORKDIR /app/api
CMD ["gunicorn", "-b", ":3000", "api:app"]
