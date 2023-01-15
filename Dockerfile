FROM rust:1.31

# set working directory
WORKDIR /app

# add app
COPY . .

RUN cargo install wasm-pack
RUN cd wasm && wasm-pack build --target web --out-dir pkg

# pull official base image
FROM node:18-alpine3.16

# install app dependencies
# --force because react-wordcloud has not updated dependencies for 2 years, but works with react@18
RUN npm install --silent --force
RUN npm run build
RUN npm install -g serve

# start
CMD ["npx", "serve",  "-s", "build"]
