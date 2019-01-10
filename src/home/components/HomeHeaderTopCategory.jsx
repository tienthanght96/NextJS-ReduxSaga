import React, { Component } from 'react';
import Link from 'next/link'
import { Icon } from 'antd';

class HeaderCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPinting: false,
		};
	}
	render() {
		const { title, isPin, onPinCategory, href, linkProps } = this.props;
		return (
			<div className="box-title flex-row-space-between">
				<h2 className="title-left">{title}</h2>
				<div className="right-box-title">
					{/* <div className="pin-category" 
						onClick={() =>{
						}}
					>
						<Icon type="pushpin-o" className="header-category-icon" />
					</div> */}
					<Link {...linkProps}>
						<a className="right-box-title-link" >
							<span>Xem thêm</span>
							<Icon type="arrow-right" className="header-category-icon" style={{ marginLeft: 5 }}/>
						</a>
					</Link>
				</div>
			</div>
		);
	}
}

export default HeaderCategory;