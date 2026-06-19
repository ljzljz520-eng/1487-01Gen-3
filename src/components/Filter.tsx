import React from 'react'
import { FilterProps } from '../types'
import StateWrapper from './StateWrapper'
import '../styles/Filter.css'

const Filter: React.FC<FilterProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = '请选择',
  loading,
  error,
  emptyState,
  errorState,
  width = '100%'
}) => {
  const isEmpty = !options || options.length === 0

  return (
    <div className="filter-wrapper" style={{ width }}>
      {label && <div className="filter-label">{label}</div>}
      <StateWrapper
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        emptyState={{
          icon: '🔍',
          title: '暂无筛选选项',
          description: '筛选项加载失败或为空',
          ...emptyState
        }}
        errorState={errorState}
        minHeight={56}
      >
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="filter-arrow">▼</div>
        </div>
      </StateWrapper>
    </div>
  )
}

export default Filter
