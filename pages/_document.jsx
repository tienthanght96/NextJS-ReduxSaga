import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<html style={{ color: '#444' }}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />

					<meta name="theme-color" content="#673ab7" />
					<link rel="manifest" href="static/manifest.json" />
					<link rel="icon" href="static/img/favicon.ico" />
					<meta name="title" content="News Web Application" />
					<meta name="description" content="Next News App" />
					<link href="https://unpkg.com/ionicons@4.4.6/dist/css/ionicons.min.css" rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&amp;subset=vietnamese" rel="stylesheet" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes,String.prototype.includes,Array.prototype.findIndex,Object.entries"></script>
        </Head>
				<body>
					<Main />
					<NextScript />
					{/* <script defer src="https://code.getmdl.io/1.3.0/material.min.js" /> */}
				</body>
			</html>
		)
	}
}
