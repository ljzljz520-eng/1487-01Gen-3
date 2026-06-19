import React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { BarChartProps } from '../types'
import StateWrapper from './StateWrapper'
import '../styles/Chart.css'

const DEFAULT_COLORS = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1']

const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  xField,
  yField,
  color,
  title,
  loading,
  error,
  emptyState,
  errorState,
  layout = 'vertical',
  width = '100%',
  height = 300
}) => {
  const yFields = Array.isArray(yField) ? yField : [yField]
  const colors = Array.isArray(color) ? color : color ? [color] : DEFAULT_COLORS
  const isHorizontal = layout === 'horizontal'

  const isEmpty = !data || data.length === 0

  return (
    <div className="chart-container" style={{ width }}>
      {title && <div className="chart-title">{title}</div>}
      <StateWrapper
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        emptyState={emptyState}
        errorState={errorState}
        minHeight={height}
      >
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={isHorizontal ? 'vertical' : 'horizontal'}
              margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              {isHorizontal ? (
                <>
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: '#8c8c8c' }}
                    axisLine={{ stroke: '#e8e8e8' }}
                    tickLine={{ stroke: '#e8e8e8' }}
                  />
                  <YAxis
                    type="category"
                    dataKey={xField}
                    tick={{ fontSize: 12, fill: '#8c8c8c' }}
                    axisLine={{ stroke: '#e8e8e8' }}
                    tickLine={{ stroke: '#e8e8e8' }}
                    width={60}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey={xField}
                    tick={{ fontSize: 12, fill: '#8c8c8c' }}
                    axisLine={{ stroke: '#e8e8e8' }}
                    tickLine={{ stroke: '#e8e8e8' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#8c8c8c' }}
                    axisLine={{ stroke: '#e8e8e8' }}
                    tickLine={{ stroke: '#e8e8e8' }}
                  />
                </>
              )}
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e8e8e8',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
              {yFields.length > 1 && <Legend />}
              {yFields.map((field, index) => (
                <Bar
                  key={field}
                  dataKey={field}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </StateWrapper>
    </div>
  )
}

export default BarChartComponent
