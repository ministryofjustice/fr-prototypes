FROM ministryofjustice/ruby:2-webapp-onbuild
# npm is installed by moj webapp
RUN npm install -g bower
RUN bower install --allow-root
CMD ["echo", "done"]
