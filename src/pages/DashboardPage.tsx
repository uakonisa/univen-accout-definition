import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Card, Row, Col, Statistic, Typography } from 'antd'
import { 
  FileTextOutlined, 
  DollarOutlined, 
  TrendingUpOutlined,
  TrendingDownOutlined 
} from '@ant-design/icons'

// Components (to be created)
// import AccountsList from '@/components/accounts/AccountsList'
// import AccountForm from '@/components/accounts/AccountForm'
// import ImportData from '@/components/data/ImportData'
// import ExportData from '@/components/data/ExportData'
// import Settings from '@/components/settings/Settings'

const { Title } = Typography

const DashboardHome: React.FC = () => {
  // Mock data - replace with real data from Supabase
  const stats = {
    totalAccounts: 156,
    incomeAccounts: 89,
    expenseAccounts: 67,
    documentsUploaded: 234,
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Dashboard Overview
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Accounts"
              value={stats.totalAccounts}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Income Accounts"
              value={stats.incomeAccounts}
              prefix={<TrendingUpOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Expense Accounts"
              value={stats.expenseAccounts}
              prefix={<TrendingDownOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Documents"
              value={stats.documentsUploaded}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity" style={{ height: 300 }}>
            <p>Recent account definitions and updates will be displayed here.</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" style={{ height: 300 }}>
            <p>Quick action buttons and shortcuts will be displayed here.</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const DashboardPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      {/* 
      <Route path="/accounts" element={<AccountsList />} />
      <Route path="/accounts/new" element={<AccountForm />} />
      <Route path="/accounts/:id/edit" element={<AccountForm />} />
      <Route path="/import" element={<ImportData />} />
      <Route path="/export" element={<ExportData />} />
      <Route path="/settings" element={<Settings />} />
      */}
    </Routes>
  )
}

export default DashboardPage
