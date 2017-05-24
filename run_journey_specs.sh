#!/usr/bin/env bash

export PORT=3001

npm start > /dev/null 2>&1 &
NPM_PID=$!

printf 'starting server'

until $(curl --output /dev/null --silent --head http://localhost:3001); do
    printf '.'
    sleep 3
done

echo
echo "server up, running specs..."

pushd journey_specs
bundle exec rspec
RSPEC_RESULTS=$?
popd

echo "killing ${NPM_PID}, rspec resulted in ${RSPEC_RESULTS}"
kill $NPM_PID

exit $RSPEC_RESULTS
