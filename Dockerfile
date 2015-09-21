FROM ministryofjustice/ruby:2-webapp-onbuild
# npm installed by moj webapp
RUN npm install -g bower
RUN bower install --allow-root
RUN middleman build --verbose
RUN middleman deploy
CMD ["echo", "done"]