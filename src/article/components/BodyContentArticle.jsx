import React, { Component  } from 'react';
import { isEmpty } from 'lodash';
import { renderToString } from 'react-dom/server';
import QuoteOtherArticle from "./QuoteOtherArticle";

export default class BodyContentArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
      bodyHtml: '',
    }
  }
  componentDidMount() {
    this.setBodyHtml(this.props.bodyHtml);
  }
  componentDidUpdate(prevProps) {
    if(
      (this.props.bodyHtml !== prevProps.bodyHtml)||
      (this.props.imagesArticle !== prevProps.imagesArticle)
    ){
      this.setBodyHtml(this.props.bodyHtml);
    }
  }

  sectionImageHtml = (image) => {
    return (
      `<div style="margin-bottom: 10px; text-align: center;">
        <img src="${image.link}" style="max-width: 100%" />
        <div class="has-text-centered">
          <span class="note-image">
            ${image.description || 'Hình ảnh minh hoạ'}
          </span>
        </div>
      </div>
      `
    );
  }

  insertImage = (arraySentences = [], bodyHtml = '') => {
    const { imagesArticle } = this.props;
    // case no image -> return body  
    if(!imagesArticle || isEmpty(imagesArticle)){
      return bodyHtml;
    }
    // case no body have images
    if(!bodyHtml || typeof bodyHtml !== 'string' || bodyHtml.length < 1){
      let htmlContent = ``;
      imagesArticle.forEach((image, index) => {
        if(!image.link) return;
        htmlContent +=
          `<div style="margin-bottom: 10px; text-align: center;">
            <img src="${image.link}" style="max-width: 100%" />
            <div class="has-text-centered">
              <span class="note-image">
                ${image.description || 'Hình ảnh minh hoạ'}
              </span>
            </div>
          </div>`
      });
      return htmlContent;
    }

    // case have image, body
    let shadowArrSentences = arraySentences.slice();
    const totalSentences = arraySentences.length;
    // loop to insert images
    /* 
      1. List length image <= length list break
      2. List length image > length list break
    */
    let indexInsertImage = 1;
    imagesArticle.forEach((image, index) => {
      if(index < bodyHtml.length && indexInsertImage < totalSentences) {
        shadowArrSentences.splice(indexInsertImage, 0, this.sectionImageHtml(image))
      } else if((index >= bodyHtml.length) || (index >= totalSentences)) {
        shadowArrSentences.splice(0, 0, this.sectionImageHtml(image))
      }
      indexInsertImage += 2;
    });
    if(shadowArrSentences.length - 4 >= 1) {
      const quoteString = renderToString(<QuoteOtherArticle />);
      shadowArrSentences.splice(shadowArrSentences.length - 4 , 0, quoteString)
    }
    shadowArrSentences = shadowArrSentences.map(setence => {
      return `<p>${setence}</p>`
    });
    return shadowArrSentences.join(' ');
  }

  setBodyHtml = (bodyHtml = '') => {
    if(bodyHtml){
      bodyHtml = bodyHtml.replace(/(?:\r\n|\r|\n)/g, '<p/>');
      const arraySentences = bodyHtml.split('<p/>');
      if(arraySentences.length)
      bodyHtml = this.insertImage(arraySentences, bodyHtml);
      this.setState({ bodyHtml });
    } else {
      bodyHtml = this.insertImage([], bodyHtml);
    }
    this.setState({ bodyHtml });
  }

  render() {
    const { bodyHtml } = this.state;
    return (
      <div className="article-detail__content__body">
        <div dangerouslySetInnerHTML={{__html: bodyHtml || ''}}/>
      </div>
    )
  }
}
