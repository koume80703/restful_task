FROM ubuntu:20.04

LABEL maintainer = "kohei_lab"
LABEL description = "node env for class"

WORKDIR /home/

ENV TERM="xterm-color"

ENV TZ="Asia/Tokyo"
ENV DEBIAN_FRONTEND=noninteractive

COPY src/package*.json ./

RUN apt -qq update && apt -qq upgrade -y
RUN apt -qq install -y nodejs npm redis-server curl