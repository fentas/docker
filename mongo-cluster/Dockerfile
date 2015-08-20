FROM quay.io/fentas/nodejs:0.12.7
MAINTAINER Jan Guth <jan.guth@gmail.com>

ENV \
  RSYNC_USER_NAME="rsyncd" \
  EXPOSE=27017 \
  MONGO_CHILD=

# add our user and group first to make sure their IDs get assigned consistently, regardless of whatever dependencies get added
RUN addgroup -g 48 -S ${RSYNC_USER_NAME} && \
  adduser -u 48 -G ${RSYNC_USER_NAME} -SHD ${RSYNC_USER_NAME}

RUN apk-install rsync && \
  cat <<EOF > /etc/rsyncd.conf
[configdb]
  path = /data/configdb
  uid = %RSYNC_USER_NAME%
  comment = mongod config server
EOF

RUN npm install -g forever
RUN mkdir /opt
COPY ./index.js /opt
RUN chown -R ${RSYNC_USER_NAME}:${RSYNC_USER_NAME} /opt


EXPOSE ${EXPOSE}
USER ${RSYNC_USER_NAME}
RUN cd /opt && \
  npm install && \
  forever start index.js --port=${EXPOSE}
