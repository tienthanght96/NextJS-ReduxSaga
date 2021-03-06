import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <link rel="icon" sizes="192x192" href="/static/touch-icon.png" /> */}
    {/* <link rel="apple-touch-icon" href="/static/touch-icon.png" /> */}
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || 'Megga News - Website tổng hợp và cá nhân hoá đọc báo'} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta name="theme-color" content="#673ab7" />
    <link rel="manifest" href="static/manifest.json" />
    <meta name="title" content="News Web Application" />
    <meta name="description" content="Next News App" />
    <link href="https://unpkg.com/ionicons@4.4.6/dist/css/ionicons.min.css" rel="stylesheet" />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
