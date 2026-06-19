export interface DataItem {
  [key: string]: string | number;
}

export interface EmptyStateConfig {
  title?: string;
  description?: string;
  icon?: string;
}

export interface ErrorStateConfig {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export interface LineChartProps {
  data: DataItem[];
  xField: string;
  yField: string | string[];
  color?: string | string[];
  title?: string;
  loading?: boolean;
  error?: string | null;
  emptyState?: EmptyStateConfig;
  errorState?: ErrorStateConfig;
  width?: number | string;
  height?: number;
}

export interface BarChartProps {
  data: DataItem[];
  xField: string;
  yField: string | string[];
  color?: string | string[];
  title?: string;
  loading?: boolean;
  error?: string | null;
  emptyState?: EmptyStateConfig;
  errorState?: ErrorStateConfig;
  layout?: 'vertical' | 'horizontal';
  width?: number | string;
  height?: number;
}

export interface MetricCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: number;
  color?: string;
  loading?: boolean;
  error?: string | null;
  emptyState?: EmptyStateConfig;
  errorState?: ErrorStateConfig;
  width?: number | string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  error?: string | null;
  emptyState?: EmptyStateConfig;
  errorState?: ErrorStateConfig;
  width?: number | string;
}
