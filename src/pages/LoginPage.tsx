import React, { useState } from 'react'
import { Card, Form, Input, Button, Typography, Alert, Space } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { supabase } from '@/lib/supabaseClient'

const { Title, Text } = Typography

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleAuth = async (values: { email: string; password: string; fullName?: string }) => {
    setLoading(true)
    setMessage(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              full_name: values.fullName,
            },
          },
        })

        if (error) throw error

        setMessage({
          type: 'success',
          text: 'Check your email for the confirmation link!',
        })
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })

        if (error) throw error
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#001529', marginBottom: 8 }}>
            University of Venda
          </Title>
          <Text type="secondary">Account Definition System</Text>
        </div>

        {message && (
          <Alert
            message={message.text}
            type={message.type}
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Form
          name="auth"
          onFinish={handleAuth}
          layout="vertical"
          size="large"
        >
          {isSignUp && (
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Full Name"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Space direction="vertical">
            <Button
              type="link"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Button>
            <Button
              type="link"
              href="/public"
            >
              View Public Accounts
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
