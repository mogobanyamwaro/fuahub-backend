#############
### base ###
#############
FROM node:16 as base


#The name of the app to build
ARG app
ENV APP=$app
RUN echo building ${APP}
#############
### build ###
#############
FROM base as build

WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install nrwl cli
RUN npm install -g @nrwl/cli

# copy dependencies
# Copy over dependency list
COPY tsconfig.base.json /app/tsconfig.base.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# COPY .npmrc /app/.npmrc
# install the app, including the dev dependencies
RUN npm install

COPY nx.json  /app/nx.json
# COPY workspace.json /app/workspace.json
#copy source
COPY libs /app/libs
COPY apps /app/apps

# generate build
# Redifining the env *might* correct cache invalidtion issue
ENV APP=server
RUN echo app is server
RUN nx run mamafua-backend:build

############
### prod ###
############

# base image
FROM base as prod
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# COPY .npmrc /app/.npmrc
RUN echo app is server
COPY --from=build /app/dist/apps/mamafua-backend/ .
RUN npm install
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express nest-winston winston query-string pg class-transformer
EXPOSE 3333
CMD node main.js
