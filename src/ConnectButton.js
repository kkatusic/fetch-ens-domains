import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useEnsName } from 'wagmi'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export const YourApp = () => {

  const [domainsENS, setDomainsENS] = useState([]);

  const { address, isConnecting, isDisconnected } = useAccount()

  const { data, isError, isLoading } = useEnsName({ address: address });

  const APIURL = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

  useEffect(() => {

    const getDomainsENS = async () => {

      const tokensQuery = `
        query {
          domains(where: {resolvedAddress_: {id: "${address.toLowerCase()}"}}) {
            id
            name
            labelName
            labelhash
            resolvedAddress {
              id
            }
            owner {
              id
            }
          }
        }`;

      const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
      })

      client
        .query({
          query: gql(tokensQuery),
        })
        .then((data) => {
          console.log(data);
          setDomainsENS(data.data.domains);
        })
        .catch((err) => {
          console.log('Error fetching data: ', err)
        })
    }

    if (address) {
      getDomainsENS();
    }

  }, [address]);

  return (
    <div className='connectHolder'>
      <ConnectButton />
      <div className='dataHolder'>
        {!isConnecting && !isDisconnected && <div className='data'>Your Address: <span>{address}</span></div>}
        {!isError && !isLoading && data && <div className='data'>Your ENS Primary domain: <span>{data}</span></div>}
        {domainsENS && domainsENS.map((item, index) => <div className='data' key={index}>ENS Domain you own: <span>{item.name}<br /> ---- id: {item.id} <br /> ---- owner: {item.resolvedAddress.id}</span></div>)}
      </div>
    </div>

  );
};
