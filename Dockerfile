# pull official base image
FROM node:18-alpine3.16

# set working directory
WORKDIR /app

# add app
COPY . .

# install app dependencies
# --force because react-wordcloud has not updated dependencies for 2 years, but works with react@18
RUN npm install --silent --force
RUN npm run build
RUN npm install -g serve

# start
CMD ["npx", "serve",  "-s", "build"]
