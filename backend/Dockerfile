# define the baseimage
# define the work directory => docker, local system => local backend directory
# install g++ compiler
# copy code from our local directory to docker working directory, COPY <local_dir> <docker_dir>
# run the npm commands to install dependencies
# expose the port which our service is running on
# specify cmd for starting our service

FROM node:24-alpine

WORKDIR /app

RUN apk update && apk add --no-cache g++

# Copy only the package.json and package-lock.json files and install dependencies.
# This allows Docker to cache this layer when package files don't change.
# Docker cache doesn’t reinstall node_modules on every small code change. More helpful for larger projects
COPY package*.json ./

RUN npm install

# Copy the rest of the application code.
# This layer will only be rebuilt if application code changes.
COPY . . 

EXPOSE 8000

CMD ["npm", "run", "start"]
# ENTRYPOINT ["node", "index.js"]