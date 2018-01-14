import { stripIndent } from 'common-tags'
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
        const news = stripIndent`
          # New in version 2.0:
          # - The two textareas have been merged into one.
          # - You can mix symbol definitions and word patterns.
          # - You can assign weights to different patterns in two ways.
          #   If you want a pattern to be used twice as often:
          CV*2
          #   If you want a pattern to be used less:
          CV*0.5
          #   Or with division:
          CV/2

          # - You can make parts of the pattern appear less often by using parentheses.
          #   This will give CVCV in half of the words and CV in the rest:
          CV(CV)

          # - It’s also possible to assign weights to those subpatterns:
          CV(CV*0.25)
          #   Or:
          CV(CV/4)

          # - You can add comments by starting the line with a # sign.
        `
        const newStorage = {
          docs: docs.map(
            ({ patterns, definitions, ...rest }) => ({
              ...rest,
              input: `${definitions}\n\n${patterns}\n\n${news}`,
            }),
          ),
        }
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
