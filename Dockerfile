# pull official base image
FROM node:16-alpine3.16

# set working directory
WORKDIR /app

# add app
COPY . .

# install app dependencies
RUN npm install --silent
RUN npm run-script build
RUN npm install -g serve

# start
CMD ["npx", "serve",  "-s", "build"]
