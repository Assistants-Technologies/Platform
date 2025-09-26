FROM debian:bookworm

RUN apt-get update && apt-get install -y \
    bash \
    curl \
    gettext-base \
    ca-certificates \
    sudo \
 && rm -rf /var/lib/apt/lists/*

RUN curl -sSfL https://raw.githubusercontent.com/ory/meta/master/install.sh -o /tmp/ory-install.sh \
 && bash /tmp/ory-install.sh -d -b /usr/local/bin kratos v1.3.1 \
 && rm /tmp/ory-install.sh

RUN curl -sLf https://cli.doppler.com/install.sh | sh

COPY kratos.tpl.yml /etc/config/kratos.tpl.yml
COPY identity.schema.json /etc/config/identity.schema.json
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh \
 && mkdir -p /.doppler /etc/config \
 && chown -R 1000:1000 /.doppler /etc/config

USER 1000:1000
ENTRYPOINT ["/entrypoint.sh"]