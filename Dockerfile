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

WORKDIR /app

COPY . .

ENV NODE_ENV=production

# install app dependencies
RUN ls
RUN ls ~/.cargo/bin/
RUN cd wasm &&  ~/.cargo/bin/wasm-pack build --target web --out-dir pkg
RUN cd ..
# --force because react-wordcloud has not updated dependencies for 2 years, but works with react@18
RUN yarn install
RUN yarn build
RUN yarn global add serve

# start
CMD ["yarn", "serve",  "-s", "build"]
