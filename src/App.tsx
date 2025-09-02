import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import { supabase } from './lib/supabaseClient'
import { User } from '@supabase/supabase-js'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PublicPage from './pages/PublicPage'

// Components
import AppHeader from './components/layout/AppHeader'
import AppSider from './components/layout/AppSider'

const { Content } = Layout

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public route */}
      <Route path="/public" element={<PublicPage />} />
      
      {/* Auth routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />
      
      {/* Protected routes */}
      <Route
        path="/dashboard/*"
        element={
          user ? (
            <Layout style={{ minHeight: '100vh' }}>
              <AppSider collapsed={collapsed} />
              <Layout>
                <AppHeader 
                  user={user} 
                  collapsed={collapsed}
                  onCollapse={setCollapsed}
                />
                <Content>
                  <DashboardPage />
                </Content>
              </Layout>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      {/* Default redirect */}
      <Route 
        path="/" 
        element={<Navigate to={user ? "/dashboard" : "/public"} replace />} 
      />
    </Routes>
  )
}

export default App
