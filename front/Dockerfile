FROM node:20-alpine AS builder


WORKDIR /frontend


COPY package.json /frontend//


RUN npm install

COPY . /frontend/

RUN npm run build


FROM nginx:1.26-alpine


RUN rm /etc/nginx/conf.d/default.conf


COPY nginx.conf /etc/nginx/conf.d/nginx.conf


COPY --from=builder /frontend/build /usr/share/nginx/html


EXPOSE 80