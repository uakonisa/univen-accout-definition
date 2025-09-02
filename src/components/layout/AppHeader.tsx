import React from 'react'
import { Layout, Button, Dropdown, Avatar, Typography, Space } from 'antd'
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  LogoutOutlined,
  SettingOutlined 
} from '@ant-design/icons'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

const { Header } = Layout
const { Text } = Typography

interface AppHeaderProps {
  user: User
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

const AppHeader: React.FC<AppHeaderProps> = ({ user, collapsed, onCollapse }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return (
    <Header className="ant-layout-header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            color: 'white',
          }}
        />
        <Text style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginLeft: 16 }}>
          Account Definition System
        </Text>
      </div>

      <Space>
        <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
          Welcome, {user.email}
        </Text>
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <Avatar
            style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </Header>
  )
}

export default AppHeader
