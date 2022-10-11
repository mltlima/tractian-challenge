import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect, useState } from "react";

import Assets from './assets';
import Companies from './companies';
import Units from './units';
import Users from './users';

const { Header, Content, Sider } = Layout;


const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export default function Home() {
  const [page, setPage] = useState('assets');
  
  return (
    <Layout>
      <Header className="header">
        <p className="logo">Freios Supremos</p>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} >
          <Menu.Item key="1" onClick={() => setPage('assets')}>
            <span>Assets</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => setPage('companies')}>
            <span>Companies</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={() => setPage('units')}>
            <span>Units</span>
          </Menu.Item>
          <Menu.Item key="4" onClick={() => setPage('users')}>
            <span>Users</span>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: "85.4vh",
            }}
          >
            {page === 'assets' && <Assets />}
            {page === 'companies' && <Companies />}
            {page === 'units' && <Units />}
            {page === 'users' && <Users />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
