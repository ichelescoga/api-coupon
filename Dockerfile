FROM node:10

RUN echo "UTC" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

WORKDIR /usr/src
COPY package*.json ./
RUN cd /usr/src 
RUN npm install

COPY . .

EXPOSE 80

CMD npm start