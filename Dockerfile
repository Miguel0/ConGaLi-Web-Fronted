FROM node:7

MAINTAINER Miguel Isasmendi <miguelisasmendi@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY build /usr/src/app/build
COPY config /usr/src/app/config
COPY src /usr/src/app/src
COPY static /usr/src/app/static
COPY test /usr/src/app/test

COPY package.json /usr/src/app/
COPY .babelrc /usr/src/app/
COPY index.html /usr/src/app/
COPY LICENSE /usr/src/app/
COPY .eslintignore /usr/src/app/
COPY .eslintrc.js /usr/src/app/
COPY .postcssrc.js /usr/src/app/

RUN npm install

EXPOSE 8080
EXPOSE 8000
CMD [ "npm", "start" ]
