FROM node:14
ENV NODE_ENV development
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "run", "watch"]