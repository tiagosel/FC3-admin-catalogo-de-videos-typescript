FROM node:14.17.0-slim
#usuario container
USER node
WORKDIR /home/node/app
#CMD [ "tail","-f","/dev/null" ]
CMD [ "sh","-c","npm install && tail -f /dev/null"]