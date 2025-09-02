import React, { useState, useEffect } from 'react'
import { 
  Layout, 
  Card, 
  Input, 
  Select, 
  Table, 
  Typography, 
  Space, 
  Button,
  Tag,
  Row,
  Col 
} from 'antd'
import { SearchOutlined, FileTextOutlined, HomeOutlined } from '@ant-design/icons'
import { AccountDefinition, AccountFilters } from '@/types'
import { supabase } from '@/lib/supabaseClient'

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

const PublicPage: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountDefinition[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<AccountFilters>({
    search: '',
    account_type: 'ALL',
  })

  // Fetch accounts from Supabase
  const fetchAccounts = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('account_definitions')
        .select('*')
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.account_type && filters.account_type !== 'ALL') {
        query = query.eq('account_type', filters.account_type)
      }

      if (filters.search) {
        query = query.or(`account_name.ilike.%${filters.search}%,account_code.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setAccounts(data || [])
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [filters])

  const columns = [
    {
      title: 'Account Code',
      dataIndex: 'account_code',
      key: 'account_code',
      width: 150,
      sorter: (a: AccountDefinition, b: AccountDefinition) => 
        a.account_code.localeCompare(b.account_code),
    },
    {
      title: 'Account Name',
      dataIndex: 'account_name',
      key: 'account_name',
      sorter: (a: AccountDefinition, b: AccountDefinition) => 
        a.account_name.localeCompare(b.account_name),
    },
    {
      title: 'Type',
      dataIndex: 'account_type',
      key: 'account_type',
      width: 100,
      render: (type: string) => (
        <Tag color={type === 'INCOME' ? 'green' : 'red'}>
          {type}
        </Tag>
      ),
      filters: [
        { text: 'Income', value: 'INCOME' },
        { text: 'Expense', value: 'EXPENSE' },
      ],
      onFilter: (value: any, record: AccountDefinition) => record.account_type === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: AccountDefinition, b: AccountDefinition) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#001529', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FileTextOutlined style={{ color: 'white', fontSize: '24px', marginRight: 16 }} />
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            University of Venda - Account Definitions
          </Title>
        </div>
        <Button 
          type="primary" 
          icon={<HomeOutlined />}
          href="/login"
        >
          Staff Login
        </Button>
      </Header>

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Search
                placeholder="Search accounts by name, code, or description"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                onSearch={(value) => setFilters({ ...filters, search: value })}
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                style={{ width: '100%' }}
                size="large"
                value={filters.account_type}
                onChange={(value) => setFilters({ ...filters, account_type: value })}
              >
                <Option value="ALL">All Types</Option>
                <Option value="INCOME">Income Only</Option>
                <Option value="EXPENSE">Expense Only</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Space>
                <Text strong>Total: {accounts.length} accounts</Text>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Table
            columns={columns}
            dataSource={accounts}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} accounts`,
            }}
            scroll={{ x: 800 }}
          />
        </Card>
      </Content>
    </Layout>
  )
}

export default PublicPage
