import * as path from 'path'

export const input = `
import * as React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const subscription = gql\`
subscription Test(
  # @graphql-typegen extract
  $episode: Episode!
) {
  reviewAdded(episode: $Episode) {
    episode
    stars
    commentary
  }
}
\`

const Comp = ({episode}: {episode: Episode}): React.Node => {
  const data = useSubscription(subscription, {
    variables: {episode}
  })
  return <div />
}
`

export const options = {
  addTypename: false,
  useFunctionTypeArguments: false,
  schemaFile: path.resolve(__dirname, '../../starwars.graphql'),
}

export const expected = `
import * as React from 'react'
import { useSubscription, type SubscriptionResult } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const subscription = gql\`
subscription Test(
  # @graphql-typegen extract
  $episode: Episode!
) {
  reviewAdded(episode: $Episode) {
    episode
    stars
    commentary
  }
}
\`

// @graphql-typegen auto-generated
type TestSubscriptionVariables = { episode: Episode }

// @graphql-typegen auto-generated
type Episode = 'NEWHOPE' | 'EMPIRE' | 'JEDI' 

// @graphql-typegen auto-generated
type TestSubscriptionData = {
  reviewAdded: ?{
    episode: ?('NEWHOPE' | 'EMPIRE' | 'JEDI'),
    stars: number,
    commentary: ?string,
  },
}

const Comp = ({episode}: {episode: Episode}): React.Node => {
  const data: SubscriptionResult<
    TestSubscriptionData,
    TestSubscriptionVariables
  > = useSubscription(subscription, {
    variables: ({ episode }: TestSubscriptionVariables),
  })
  return <div />
}
`
