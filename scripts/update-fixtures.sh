#!/bin/sh

# routes
echo "fetching /routes-fares/schedules ..."
node -e "path = '/routes-fares/schedules'; fixture = 'src/lib/sources/bcf/tests/fixtures/routes-fares/schedules'; require('axios')('https://www.bcferries.com' + path).then(res => {require('fs').writeFileSync(fixture + '.json', JSON.stringify(res.data)); require('fs').writeFileSync(fixture + '.html', res.data)})"

# availability
echo "fetching /sailing-availability?departureTime=2025-01-26%2014:10:00&routeCode=HSB-LNG ..."
node -e "path = '/sailing-availability?departureTime=2025-01-26%2014:10:00&routeCode=HSB-LNG'; fixture = 'src/lib/sources/bcf/tests/fixtures/availability'; require('axios')('https://www.bcferries.com' + path).then(res => {require('fs').writeFileSync(fixture + '.json', JSON.stringify(res.data)); require('fs').writeFileSync(fixture + '.html', res.data)})"

# current-conditions
echo "fetching /current-conditions/HSB-LNG ..."
node -e "path = '/current-conditions/HSB-LNG'; fixture = 'src/lib/sources/bcf/tests/fixtures/current-conditions'; require('axios')('https://www.bcferries.com' + path).then(res => {require('fs').writeFileSync(fixture + '.json', JSON.stringify(res.data)); require('fs').writeFileSync(fixture + '.html', res.data)})"

# departures
echo "fetching /current-conditions/departures?terminalCode=HSB ..."
node -e "path = '/current-conditions/departures?terminalCode=HSB'; fixture = 'src/lib/sources/bcf/tests/fixtures/current-conditions/departures'; require('axios')('https://www.bcferries.com' + path).then(res => {require('fs').writeFileSync(fixture + '.json', JSON.stringify(res.data)); require('fs').writeFileSync(fixture + '.html', res.data)})"

# daily-schedule
echo "fetching /routes-fares/schedules/daily/HSB-LNG ..."
node -e "path = '/routes-fares/schedules/daily/HSB-LNG'; fixture = 'src/lib/sources/bcf/tests/fixtures/routes-fares/schedules/daily'; require('axios')('https://www.bcferries.com' + path).then(res => {require('fs').writeFileSync(fixture + '.json', JSON.stringify(res.data)); require('fs').writeFileSync(fixture + '.html', res.data)})"

# seasonal-schedule
echo "fetching /routes-fares/schedules/seasonal/HSB-LNG ..."
node -e "path = '/routes-fares/schedules/seasonal/HSB-LNG'; fixture = 'src/lib/sources/bcf/tests/fixtures/routes-fares/schedules/seasonal'; require('axios')('https://www.bcferries.com' + path).then(res => {require('fs').writeFileSync(fixture + '.json', JSON.stringify(res.data)); require('fs').writeFileSync(fixture + '.html', res.data)})"

# departures
echo "fetching /current-conditions/departures?terminalCode=HSB ..."
node -e "path = '/current-conditions/departures?terminalCode=HSB'; fixture = 'src/lib/sources/bcf/tests/fixtures/current-conditions/departures'; require('axios')('https://www.bcferries.com' + path).then(res => {require('fs').writeFileSync(fixture + '.json', JSON.stringify(res.data)); require('fs').writeFileSync(fixture + '.html', res.data)})"
