import React from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { LineChartProps } from '../types'
import StateWrapper from './StateWrapper'
import '../styles/Chart.css'

const DEFAULT_COLORS = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1']

const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  xField,
  yField,
  color,
  title,
  loading,
  error,
  emptyState,
  errorState,
  width = '100%',
  height = 300
}) => {
  const yFields = Array.isArray(yField) ? yField : [yField]
  const colors = Array.isArray(color) ? color : color ? [color] : DEFAULT_COLORS

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
            <RechartsLineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e8e8e8',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
              {yFields.length > 1 && <Legend />}
              {yFields.map((field, index) => (
                <Line
                  key={field}
                  type="monotone"
                  dataKey={field}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </StateWrapper>
    </div>
  )
}

export default LineChartComponent
