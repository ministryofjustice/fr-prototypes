FROM ministryofjustice/ruby:2-webapp-onbuild
# npm is installed by moj webapp
RUN npm install -g bower
RUN bower install --allow-root
# work out how to pass in ssh keys from jenkins https://gist.github.com/d11wtq/8699521
# docker run -i -t -v $(readlink -f $SSH_AUTH_SOCK):/ssh-agent -e SSH_AUTH_SOCK=/ssh-agent ubuntu /bin/bash
# in jenkins maybe
RUN middleman build --verbose
RUN middleman deploy
CMD ["echo", "done"]
