#!/bin/sh

# routes
node ./scripts/bcf/fetch-fixture.js /routes-fares/schedules

# availability
node ./scripts/bcf/fetch-fixture.js "/sailing-availability?departureTime=2025-01-26%2014:10:00&routeCode=HSB-LNG" availability

# # current-conditions
node ./scripts/bcf/fetch-fixture.js /current-conditions/HSB-LNG current-conditions

# # departures
node ./scripts/bcf/fetch-fixture.js "/current-conditions/departures?terminalCode=HSB" current-conditions/departures

# # daily-schedule
node ./scripts/bcf/fetch-fixture.js /routes-fares/schedules/daily/HSB-LNG routes-fares/schedules/daily

# seasonal-schedule
node ./scripts/bcf/fetch-fixture.js /routes-fares/schedules/seasonal/HSB-LNG routes-fares/schedules/seasonal

# current-conditions-beta
node ./scripts/bcf/fetch-fixture.js /current-conditions-beta/HSB-LNG current-conditions-beta
