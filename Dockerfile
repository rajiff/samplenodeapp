FROM mhart/alpine-node
 
RUN apk add --update python build-base

# Create app directory
RUN mkdir -p /usr/src/app && echo "Sample Webapp"
COPY package.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY . /usr/src/app/

EXPOSE 5000

WORKDIR /usr/src/app
CMD ["npm", "start"]
