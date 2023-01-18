# pull official base image
FROM node:18-bullseye-slim

RUN apt-get update && \
    apt-get install -y curl build-essential

WORKDIR /tmp

RUN curl https://sh.rustup.rs -sSf > rustup.sh
RUN chmod 755 rustup.sh
RUN ./rustup.sh -y
RUN rm /tmp/rustup.sh

RUN ~/.cargo/bin/cargo install wasm-pack
ENV PATH="${PATH}:/root/.cargo/bin"
RUN echo $PATH
RUN whoami

WORKDIR /app

COPY . .

ENV NODE_ENV=production

# install app dependencies
# RUN  ~/.cargo/bin/wasm-pack --version
RUN yarn build:wasm
RUN yarn install
RUN yarn build
RUN yarn global add serve

# start
CMD ["yarn", "serve",  "-s", "build"]
