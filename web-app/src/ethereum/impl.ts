import { BaseEthereum, configureEthereum } from './lib'
import abi from './abi.json'

const address = '0x7f3ddb582b008fA95420320317fEE1486c042556'

export interface Image {
  is_claimed: boolean
  title: string
  url: string
  owner: string
}

class Ethereum extends BaseEthereum {
  constructor (
    account: string
  ) {
    super(account, address, abi)
  }

  async getImage (id: number): Promise<Image> {
    return await this.contract.methods.images(id).call({ from: this.account })
  }

  async buyImage (title: string, url: string): Promise<Image> {
    return await this.contract.methods.buyImage(title, url).send({ from: this.account, value: 10**18 })
  }

  async getAllImages (): Promise<Image[]> {
    return (await this.contract.methods.getAllImages().call({ from: this.account })).filter((x: Image) => x.is_claimed)
    // const promises = []
    // for (let i = 1; i < 1001; i++) {
    //   promises.push(this.getImage(i))
    // }
    // return (await Promise.all(promises)).filter(x => x.is_claimed)
  }
}

const { useEthereumInit, useEthereum } = configureEthereum(Ethereum)

export { useEthereumInit, useEthereum }
