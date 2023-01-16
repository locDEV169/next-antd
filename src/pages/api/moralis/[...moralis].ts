import { MoralisNextApi } from '@moralisweb3/next';

export default MoralisNextApi({
  // apiKey: 'ZLyqzgVJKWGpE5y02q1VffAgaFWWS6PMMMtTkqUPaBeOX1ikeo3Wdsc6wdpUAB77' || process.env.MORALIS_API_KEY ,
  apiKey: 'ZLyqzgVJKWGpE5y02q1VffAgaFWWS6PMMMtTkqUPaBeOX1ikeo3Wdsc6wdpUAB77',
  authentication: {
    domain: 'ethereum-boilerplate.dapp',
    uri: 'http://localhost:3000',
    timeout: 120,
  },
});
