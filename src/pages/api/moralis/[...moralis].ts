import { MoralisNextApi } from '@moralisweb3/next';

export default MoralisNextApi({
  apiKey: 'ZLyqzgVJKWGpE5y02q1VffAgaFWWS6PMMMtTkqUPaBeOX1ikeo3Wdsc6wdpUAB77' || process.env.MORALIS_API_KEY ,
  // apiKey: 'ZLyqzgVJKWGpE5y02q1VffAgaFWWS6PMMMtTkqUPaBeOX1ikeo3Wdsc6wdpUAB77',
  authentication: {
    domain: 'amazing.dapp',
    uri: 'http://localhost:3000' || process.env.NEXTAUTH_URL,
    timeout: 120,
  },
});
