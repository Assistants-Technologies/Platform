FROM traefik:v3.5.2

USER root
RUN apk update && apk add --no-cache bash curl gettext ca-certificates gnupg

RUN curl -sLf https://cli.doppler.com/install.sh | sh

COPY dynamic.tpl.yml /etc/traefik/dynamic.tpl.yml
COPY entrypoint.sh /entrypoint.sh
COPY traefik.yml /etc/traefik/traefik.yml

RUN mkdir -p /.doppler /etc/traefik /certs \
 && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]