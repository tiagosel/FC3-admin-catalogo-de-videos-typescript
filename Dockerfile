FROM node:14.15.1-alpine
#usuario container
USER node
WORKDIR /home/node/app
#CMD [ "tail","-f","/dev/null" ]
CMD [ "sh","-c","npm install && tail -f /dev/null"]