# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add app
COPY . .

# install app dependencies
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm run-script build
RUN npm install -g serve

# start
CMD ["npx", "serve",  "-s", "build"]
