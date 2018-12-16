import React, { Component  } from 'react';
import { isEmpty } from 'lodash';
import { renderToString } from 'react-dom/server';
import { findAllIndexOfString } from '../../utils/utils';
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

  insertImageForArticleBody = (bodyHtml, imagesArticle = []) => {
    if(!imagesArticle || isEmpty(imagesArticle)){
      return bodyHtml;
    }
    const arrPositionBreakWork =  findAllIndexOfString(/<p/g, bodyHtml);

    if(!bodyHtml || typeof bodyHtml !== 'string' || bodyHtml.length < 1 || arrPositionBreakWork.length < 1){
      let htmlContent = ``;
      imagesArticle.forEach((image, index) => {
        if(!image.link) return;
        htmlContent += `<div style="margin-bottom: 10px; text-align: center;">
                            <img src="${image.link}" style="max-width: 100%" />
                            <div class="has-text-centered"><span class="note-image">Hình ảnh số ${index + 1}</span></div>
                        </div>`
      });
      return htmlContent;
    } else {
      // console.log('arrPositionBreakWork', arrPositionBreakWork)

      const listImagesCopy = imagesArticle.slice();
      const listIndexExistImage = [];

      let htmlContent = bodyHtml.slice();

      // const listPositionOdd = arrPositionBreakWork.filter(postiton => postiton % 2 !== 0);
      // const listPositionEven = arrPositionBreakWork.filter(postiton => postiton % 2 === 0);

      listImagesCopy.forEach((image, index )=> {
        let randomIndex = 0;

        if(arrPositionBreakWork.length > 0){
          randomIndex = Math.floor((Math.random() * (arrPositionBreakWork.length - 1)));
        }

        if(arrPositionBreakWork.length === 0){
            htmlContent =  htmlContent.slice(0, listIndexExistImage[0] )
                            +   `<div style="margin-bottom: 10px; text-align: center; margin-top: 10px">
                                    <img src="${image.link}" style="max-width: 100%" />
                                    <div class="has-text-centered"><span class="note-image">Hình ảnh</span></div>
                                </div>`
                            + htmlContent.slice(listIndexExistImage[0]);
            return;
        }
        // console.log('arrPositionBreakWork', arrPositionBreakWork);
        // nếu vị trí ngẫu nhiên đã chèn ảnh
        if( (arrPositionBreakWork[randomIndex] === arrPositionBreakWork[arrPositionBreakWork.length - 3]) ||
            (listIndexExistImage.indexOf(arrPositionBreakWork[randomIndex]) > -1)
        ){
          htmlContent =  htmlContent.slice(0, arrPositionBreakWork[0] )
                          +   `<div style="margin-bottom: 10px; text-align: center; margin-top: 10px">
                                  <img src="${image.link}" style="max-width: 100%" />
                                  <div class="has-text-centered"><span class="note-image">Hình ảnh</span></div>
                              </div>`
                          + htmlContent.slice(arrPositionBreakWork[0]);
          listIndexExistImage.push(arrPositionBreakWork[0]);
          arrPositionBreakWork.splice(0, 1);

        } else { // vị trí ngẫu nhiên chưa chèn ảnh
          htmlContent =  htmlContent.slice(0,arrPositionBreakWork[randomIndex] )
                          +   `<div style="margin-bottom: 10px; text-align: center; margin-top: 10px">
                                  <img src="${image.link}" style="max-width: 100%" />
                                  <div class="has-text-centered"><span class="note-image">Hình ảnh</span></div>
                              </div>`
                          + htmlContent.slice(arrPositionBreakWork[randomIndex]);

          listIndexExistImage.push(arrPositionBreakWork[randomIndex]);
          arrPositionBreakWork.splice(randomIndex, 1);
        }
      });
      // console.log('htmlContent ========>', htmlContent)
      return htmlContent;
    }
  }

  setBodyHtml = (bodyHtml = '') => {
    const { imagesArticle } = this.props;
    const pictures = imagesArticle && imagesArticle.length > 0 ? imagesArticle : [];
    if(bodyHtml){
      // console.log('1')
      bodyHtml = bodyHtml.replace(/(?:\r\n|\r|\n)/g, '<p/>');
      const arraySentences = findAllIndexOfString(/<p/g, bodyHtml);
      
      bodyHtml = this.insertImageForArticleBody(bodyHtml, pictures);

      if(arraySentences && arraySentences.length > 3 && arraySentences[arraySentences.length -1]){
          bodyHtml = bodyHtml.slice(0, arraySentences[arraySentences.length - 3] ) + renderToString(<QuoteOtherArticle />) + bodyHtml.slice(arraySentences[arraySentences.length -3]);
      }
    } else {
      // console.log('2')
      bodyHtml = this.insertImageForArticleBody(bodyHtml, pictures);
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
