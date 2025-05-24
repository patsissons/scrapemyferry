const { writeFile } = require('fs/promises')
const axios = require('axios')

async function fetchFixture(path, fixture = path.trimStart('/')) {
  const url = 'https://www.bcferries.com' + path
  const res = await axios.get(url)
  process.stdout.write(`fetching ${path} (via ${url})…`)

  const fixturePath = 'src/lib/sources/bcf/test/fixtures/' + fixture
  await Promise.all([
    writeFile(fixturePath + '.json', JSON.stringify(res.data)),
    writeFile(fixturePath + '.html', res.data),
  ])
}

fetchFixture(...process.argv.slice(2))
  .then(() => {
    console.log(' ✅')
  })
  .catch((err) => {
    console.error(' ❌', err)
  })
