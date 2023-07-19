import { TokenDocument } from '../../src/graphql/data/__generated__/types-and-hooks'
import client from '../client'

function formatTitleName(symbol: string, name: string) {
  if (symbol) {
    return 'Get ' + symbol + ' on Uniswap'
  }
  if (name) {
    return 'Get ' + name + ' on Uniswap'
  }
  return 'View Token on Uniswap'
}

export default async function getToken(networkName: string, tokenAddress: string, url: string) {
  const lowerNetworkName = networkName.toLowerCase()
  const tokenAddressRef = tokenAddress === '0x0000000000000000000000000000000000000000' ? 'NATIVE' : tokenAddress
  const origin = new URL(url).origin
  const image = origin + '/api/image/tokens/' + lowerNetworkName + '/' + tokenAddressRef
  const { data } = await client.query({
    query: TokenDocument,
    variables: {
      chain: networkName,
      address: tokenAddress,
    },
  })
  const asset = data?.token
  if (!asset) {
    return undefined
  }
  const title = formatTitleName(asset.symbol, asset.name)
  const formattedAsset = {
    title,
    image,
    url,
  }
  return formattedAsset
}
