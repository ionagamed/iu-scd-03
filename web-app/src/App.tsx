import { Button, Card, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './App.css'
import { Image, useEthereum, useEthereumInit } from './ethereum/impl'

function App () {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
  const [images, setImages] = useState<Image[]>([])

  async function buyImage () {
    await eth.buyImage(title, url)
  }

  async function updateImages () {
    const images = await eth.getAllImages()
    setImages(images.map(x => ({
      ...x
    })))
  }

  const fallback = useEthereumInit()
  const eth = useEthereum()
  if (fallback) {
    return fallback
  }

  if (!imagesLoaded) {
    updateImages()
    setImagesLoaded(true)
  }

  console.log(images)

  const imageNodes = []
  for (let i = 0; i < images.length; i++) {
    imageNodes.push(
      <Card style={{ padding: '10px', margin: '10px' }} color='gray' variant='outlined' key={i}>
        Title: {images[i].title}
        <br/>
        <img src={images[i].url} />
      </Card>
    )
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Card style={{ padding: '10px' }} color='gray' variant='outlined'>
        <TextField label='Image title' variant='outlined' onChange={e => setTitle(e.target.value)} />
        <br/>
        <TextField label='Image URL' variant='outlined' onChange={e => setUrl(e.target.value)} />
        <br/>
        <Button onClick={buyImage}>
          Buy a new image!
        </Button>
      </Card>
      {imageNodes}
    </Container>
  )
}

export default App

