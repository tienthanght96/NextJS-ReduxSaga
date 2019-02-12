import React from 'react';
import Link from 'next/link';
import { Icon, Tag } from 'antd';

export const Tags = ({tags }) => {
  if(!Array.isArray(tags) || tags.length < 1) return null;

  return (
    <div className="tags-articles">
      <span className="tag-name">
        <Icon style={{ marginRight: 5 }} type="tags" />
        Tags:  &nbsp;  &nbsp; 
      </span>
      { tags.map((tag, index) => (
          <Link key={index} href={`/tags?tag=${tag}`}>
            <a>
              <Tag  color="#e51515">{tag}</Tag>
            </a>
          </Link>
        ))
      }
    </div>
  );
}