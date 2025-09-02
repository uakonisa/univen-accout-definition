import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  FileTextOutlined,
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

interface AppSiderProps {
  collapsed: boolean
}

const AppSider: React.FC<AppSiderProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'accounts',
      icon: <FileTextOutlined />,
      label: 'Account Management',
      children: [
        {
          key: '/dashboard/accounts',
          icon: <SearchOutlined />,
          label: 'View Accounts',
        },
        {
          key: '/dashboard/accounts/new',
          icon: <PlusOutlined />,
          label: 'Add Account',
        },
      ],
    },
    {
      key: 'data',
      icon: <UploadOutlined />,
      label: 'Data Management',
      children: [
        {
          key: '/dashboard/import',
          icon: <UploadOutlined />,
          label: 'Import Data',
        },
        {
          key: '/dashboard/export',
          icon: <DownloadOutlined />,
          label: 'Export Data',
        },
      ],
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  // Get current selected key from location
  const getSelectedKey = () => {
    const path = location.pathname
    if (path === '/dashboard') return ['/dashboard']
    if (path.startsWith('/dashboard/accounts/new')) return ['/dashboard/accounts/new']
    if (path.startsWith('/dashboard/accounts')) return ['/dashboard/accounts']
    if (path.startsWith('/dashboard/import')) return ['/dashboard/import']
    if (path.startsWith('/dashboard/export')) return ['/dashboard/export']
    if (path.startsWith('/dashboard/settings')) return ['/dashboard/settings']
    return ['/dashboard']
  }

  // Get open keys for submenus
  const getOpenKeys = () => {
    const path = location.pathname
    if (path.startsWith('/dashboard/accounts')) return ['accounts']
    if (path.startsWith('/dashboard/import') || path.startsWith('/dashboard/export')) return ['data']
    return []
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ 
        height: 32, 
        margin: 16, 
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: collapsed ? '12px' : '14px'
      }}>
        {collapsed ? 'UV' : 'UNIVEN'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKey()}
        defaultOpenKeys={getOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}

export default AppSider
