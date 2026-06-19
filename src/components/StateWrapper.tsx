import React from 'react'
import { EmptyStateConfig, ErrorStateConfig } from '../types'
import '../styles/StateWrapper.css'

interface StateWrapperProps {
  loading?: boolean
  error?: string | null
  isEmpty?: boolean
  emptyState?: EmptyStateConfig
  errorState?: ErrorStateConfig
  children: React.ReactNode
  minHeight?: number
}

const StateWrapper: React.FC<StateWrapperProps> = ({
  loading,
  error,
  isEmpty,
  emptyState,
  errorState,
  children,
  minHeight = 200
}) => {
  if (loading) {
    return (
      <div className="state-wrapper loading" style={{ minHeight }}>
        <div className="state-content">
          <div className="loading-spinner"></div>
          <p className="state-text">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-wrapper error" style={{ minHeight }}>
        <div className="state-content">
          <div className="state-icon">⚠️</div>
          <h4 className="state-title">{errorState?.title || '数据加载失败'}</h4>
          <p className="state-text">{error || errorState?.description || '请检查网络连接后重试'}</p>
          {errorState?.onRetry && (
            <button className="retry-btn" onClick={errorState.onRetry}>
              重新加载
            </button>
          )}
        </div>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="state-wrapper empty" style={{ minHeight }}>
        <div className="state-content">
          <div className="state-icon">{emptyState?.icon || '📊'}</div>
          <h4 className="state-title">{emptyState?.title || '暂无数据'}</h4>
          <p className="state-text">{emptyState?.description || '请选择数据后重试'}</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default StateWrapper
