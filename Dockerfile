FROM ministryofjustice/ruby:2-webapp-onbuild
RUN bundle exec middleman build --verbose
RUN bundle exec middleman deploy
CMD ["echo", "done"]