import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const tag = 'Hm-Ps'

const adapter = new LocalStorage(`${tag}-${process.env.VUE_APP_VERSION}`)
const db = low(adapter)

db
  .defaults({
    sys: {}
  })
  .write()

export default db
