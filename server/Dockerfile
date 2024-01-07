FROM ubuntu:22.04
RUN sudo apt-get update -y
RUN sudo apt install libreoffice -y
RUN sudo apt install libreoffice-common -y
RUN sudo apt install imagemagick -y
RUN sudo apt install ffmpeg -y
RUN sudo apt install node -y
COPY . /
RUN npm install
RUN node /src/index.js
# RUN make /app
# CMD python /app/app.py