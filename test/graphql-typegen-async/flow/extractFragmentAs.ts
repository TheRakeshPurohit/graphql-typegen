import * as path from 'path'

export const input = `
import gql from 'graphql-tag'

const fragment = gql\`
# @graphql-typegen extract as CharacterFieldsTest
fragment CharacterFields on Character {
  name
  # @graphql-typegen extract
  appearsIn
}
\`

const query = gql\`
\${fragment}
query Test($id: ID!) {
  character(id: $id) {
    id
    ...CharacterFields
  }
}
\`
`

export const options = {
  addTypename: false,
  schemaFile: path.resolve(__dirname, '../../../starwars.graphql'),
}

export const expected = `
import gql from 'graphql-tag'

const fragment = gql\`
# @graphql-typegen extract as CharacterFieldsTest
fragment CharacterFields on Character {
  name
  # @graphql-typegen extract
  appearsIn
}
\`

// @graphql-typegen auto-generated
type CharacterFieldsTest = {
  name: string,
  appearsIn: Array<?Episode>,
}

// @graphql-typegen auto-generated
type Episode = 'NEWHOPE' | 'EMPIRE' | 'JEDI'

const query = gql\`
\${fragment}
query Test($id: ID!) {
  character(id: $id) {
    id
    ...CharacterFields
  }
}
\`

// @graphql-typegen auto-generated
type TestQueryVariables = { id: string }

// @graphql-typegen auto-generated
type TestQueryData = { character: ?({ id: string, } & CharacterFieldsTest) }
`
