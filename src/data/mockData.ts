import { DataItem, FilterOption } from '../types'

export const lineChartData: DataItem[] = [
  { month: '1月', sales: 4000, profit: 2400 },
  { month: '2月', sales: 3000, profit: 1398 },
  { month: '3月', sales: 2000, profit: 9800 },
  { month: '4月', sales: 2780, profit: 3908 },
  { month: '5月', sales: 1890, profit: 4800 },
  { month: '6月', sales: 2390, profit: 3800 }
]

export const barChartData: DataItem[] = [
  { name: '产品A', value: 4000 },
  { name: '产品B', value: 3000 },
  { name: '产品C', value: 2000 },
  { name: '产品D', value: 2780 },
  { name: '产品E', value: 1890 }
]

export const barChartDataMulti: DataItem[] = [
  { name: '产品A', sales2023: 4000, sales2024: 2400 },
  { name: '产品B', sales2023: 3000, sales2024: 1398 },
  { name: '产品C', sales2023: 2000, sales2024: 9800 },
  { name: '产品D', sales2023: 2780, sales2024: 3908 },
  { name: '产品E', sales2023: 1890, sales2024: 4800 }
]

export const filterOptions: FilterOption[] = [
  { label: '全部', value: 'all' },
  { label: '华东地区', value: 'east' },
  { label: '华北地区', value: 'north' },
  { label: '华南地区', value: 'south' },
  { label: '西南地区', value: 'west' }
]

export const colorPresets = [
  '#1677ff',
  '#52c41a',
  '#faad14',
  '#ff4d4f',
  '#722ed1',
  '#13c2c2',
  '#eb2f96',
  '#fa8c16'
]
