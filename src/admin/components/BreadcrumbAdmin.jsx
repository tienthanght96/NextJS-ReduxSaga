import React from 'react'
import { Layout, Breadcrumb } from "antd";

export default function BreadcrumbAdmin({ breadcrumbs }) {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      { breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}