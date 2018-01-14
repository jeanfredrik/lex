import localStorage from './localStorage'

const migrations = [
  // Merge `patterns` and `definitions` fields into one `input` field on all documents.
  () => {
    if (
      !localStorage.has('jeanfredrik/lex/1') &&
      localStorage.has('store')
    ) {
      // The old storage used base64 encoding, but it didn’t play well
      // with unicode so we’re not using it anymore.
      const oldStorage = JSON.parse(
        atob(window.localStorage.getItem('store')),
      )
      const { docs } = oldStorage
      if (docs) {
        window.localStorage.clear()
        const newStorage = {
          docs: docs.map(({
            patterns,
            definitions,
            ...rest
          }) => ({
            ...rest,
            input: `${definitions}\n\n${patterns}`,
          })),
        };
        localStorage.set('jeanfredrik/lex/1', newStorage)
      }
    }
  },
]

export default () => {
  migrations.forEach(migration => {
    migration()
  })
}
