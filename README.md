# ENS Domain Fetch

This simple project use you address from wallet that you connect to it and read is there any ENS DOmains attached to that address.

It only reads domains that you are `Registrant` not that you are `Controller`.

## Used Scripts

For connecting to crypto wallet we use this library [RainbowKit](https://www.rainbowkit.com/).

For quering user domains we use this library [Apollo Client](https://github.com/apollographql/apollo-client) to fetch some API data via GraphQL query. 

API that we use is [the GraphQL API](https://thegraph.com/en/). Here you can find playground to test your GraphQL query: (https://thegraph.com/hosted-service/subgraph/ensdomains/ens)