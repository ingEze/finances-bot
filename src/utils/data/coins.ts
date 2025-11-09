export const coins = {
  bitcoin: {
    id: 'bitcoin',
    aliases: ['bitcoin', 'btc', 'bitcoinn'],
    type: 'coin',
    network: null,
    contract: null
  },
  ethereum: {
    id: 'ethereum',
    aliases: ['ethereum', 'eth', 'etherum', 'ehterum'],
    type: 'coin',
    network: null,
    contract: null
  },
  tether: {
    id: 'tether',
    aliases: ['tether', 'usdt'],
    type: 'token',
    network: 'ethereum',
    contract: '0xdac17f958d2ee523a2206206994597c13d831ec7'
  },
  shiba: {
    id: 'shiba-inu',
    aliases: ['shiba', 'shiba inu', 'shib'],
    type: 'token',
    network: 'ethereum',
    contract: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'
  },
  pepe: {
    id: 'pepe',
    aliases: ['pepe', 'pepecoin'],
    type: 'token',
    network: 'ethereum',
    contract: '0x6982508145454Ce325dDbE47a25d4ec3d2311933'
  },
  uniswap: {
    id: 'uniswap',
    aliases: ['uniswap', 'uni'],
    type: 'token',
    network: 'ethereum',
    contract: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
  }
}
