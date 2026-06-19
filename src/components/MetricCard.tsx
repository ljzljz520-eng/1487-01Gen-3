import React from 'react'
import { MetricCardProps } from '../types'
import StateWrapper from './StateWrapper'
import '../styles/MetricCard.css'

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  prefix,
  suffix,
  trend,
  color = '#1677ff',
  loading,
  error,
  emptyState,
  errorState,
  width = '100%'
}) => {
  const isEmpty = value === undefined || value === null || value === ''

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString()
    }
    return val
  }

  const getTrendIcon = () => {
    if (trend === undefined) return null
    if (trend > 0) return '↑'
    if (trend < 0) return '↓'
    return '→'
  }

  const getTrendColor = () => {
    if (trend === undefined) return ''
    if (trend > 0) return '#52c41a'
    if (trend < 0) return '#ff4d4f'
    return '#8c8c8c'
  }

  return (
    <div className="metric-card" style={{ width }}>
      <StateWrapper
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        emptyState={emptyState}
        errorState={errorState}
        minHeight={120}
      >
        <div className="metric-content">
          <div className="metric-label">{label}</div>
          <div className="metric-value-wrapper">
            <div className="metric-value" style={{ color }}>
              {prefix && <span className="metric-prefix">{prefix}</span>}
              <span className="metric-number">{formatValue(value as any)}</span>
              {suffix && <span className="metric-suffix">{suffix}</span>}
            </div>
            {trend !== undefined && (
              <div className="metric-trend" style={{ color: getTrendColor() }}>
              {getTrendIcon()} {Math.abs(trend)}%
            </div>
            )}
          </div>
        </div>
      </StateWrapper>
    </div>
  )
}

export default MetricCard
