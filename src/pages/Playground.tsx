import React, { useState, useMemo } from 'react'
import { LineChart, BarChart, MetricCard, Filter } from '../components'
import { lineChartData, barChartDataMulti, filterOptions, colorPresets } from '../data/mockData'
import '../styles/Playground.css'

type ComponentType = 'lineChart' | 'barChart' | 'metricCard' | 'filter'

interface ConfigState {
  lineChart: {
    xField: string
    yField: string
    color: string
    title: string
    loading: boolean
    error: string
    showEmpty: boolean
  }
  barChart: {
    xField: string
    yField: string
    color: string
    title: string
    layout: 'vertical' | 'horizontal'
    loading: boolean
    error: string
    showEmpty: boolean
  }
  metricCard: {
    value: string
    label: string
    prefix: string
    suffix: string
    trend: string
    color: string
    loading: boolean
    error: string
    showEmpty: boolean
  }
  filter: {
    label: string
    placeholder: string
    loading: boolean
    error: string
    showEmpty: boolean
  }
}

const defaultConfig: ConfigState = {
  lineChart: {
    xField: 'month',
    yField: 'sales',
    color: '#1677ff',
    title: '月度销售趋势',
    loading: false,
    error: '',
    showEmpty: false
  },
  barChart: {
    xField: 'name',
    yField: 'sales2023,sales2024',
    color: '#1677ff,#52c41a',
    title: '产品年度销售对比',
    layout: 'vertical',
    loading: false,
    error: '',
    showEmpty: false
  },
  metricCard: {
    value: '12560',
    label: '本月销售额',
    prefix: '¥',
    suffix: '',
    trend: '12.5',
    color: '#1677ff',
    loading: false,
    error: '',
    showEmpty: false
  },
  filter: {
    label: '选择区域',
    placeholder: '请选择销售区域',
    loading: false,
    error: '',
    showEmpty: false
  }
}

const componentList: { key: ComponentType; name: string; icon: string }[] = [
  { key: 'lineChart', name: '折线图', icon: '📈' },
  { key: 'barChart', name: '柱状图', icon: '📊' },
  { key: 'metricCard', name: '指标卡', icon: '📋' },
  { key: 'filter', name: '筛选器', icon: '🔍' }
]

const Playground: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('lineChart')
  const [config, setConfig] = useState<ConfigState>(defaultConfig)
  const [copied, setCopied] = useState(false)
  const [filterValue, setFilterValue] = useState('')

  const updateConfig = <K extends ComponentType>(key: K, patch: Partial<ConfigState[K]>) => {
    setConfig((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...patch }
    }))
  }

  const generatedCode = useMemo(() => {
    const c = config[activeComponent]
    switch (activeComponent) {
      case 'lineChart': {
        const lc = c as ConfigState['lineChart']
        const dataProp = lc.showEmpty ? 'data={[]}' : 'data={lineChartData}'
        const errorProp = lc.error ? `  error="${lc.error}"\n` : ''
        const loadingProp = lc.loading ? '  loading={true}\n' : ''
        return `import { LineChart } from 'lowcode-charts'
import { lineChartData } from './data'

<LineChart
  ${dataProp}
  xField="${lc.xField}"
  yField="${lc.yField}"
  color="${lc.color}"
  title="${lc.title}"
${errorProp}${loadingProp}/>`
      }
      case 'barChart': {
        const bc = c as ConfigState['barChart']
        const yFields = bc.yField.split(',').map((s) => s.trim()).filter(Boolean)
        const colors = bc.color.split(',').map((s) => s.trim()).filter(Boolean)
        const dataProp = bc.showEmpty ? 'data={[]}' : 'data={barChartData}'
        const yFieldProp = yFields.length > 1
          ? `  yField={${JSON.stringify(yFields)}}\n`
          : `  yField="${yFields[0] || 'value'}"\n`
        const colorProp = colors.length > 1
          ? `  color={${JSON.stringify(colors)}}\n`
          : `  color="${colors[0] || '#1677ff'}"\n`
        const errorProp = bc.error ? `  error="${bc.error}"\n` : ''
        const loadingProp = bc.loading ? '  loading={true}\n' : ''
        return `import { BarChart } from 'lowcode-charts'
import { barChartData } from './data'

<BarChart
  ${dataProp}
  xField="${bc.xField}"
${yFieldProp}${colorProp}  title="${bc.title}"
  layout="${bc.layout}"
${errorProp}${loadingProp}/>`
      }
      case 'metricCard': {
        const mc = c as ConfigState['metricCard']
        const valueProp = mc.showEmpty ? '' : `  value={${mc.value}}\n`
        const prefixProp = mc.prefix ? `  prefix="${mc.prefix}"\n` : ''
        const suffixProp = mc.suffix ? `  suffix="${mc.suffix}"\n` : ''
        const trendProp = mc.trend ? `  trend={${mc.trend}}\n` : ''
        const errorProp = mc.error ? `  error="${mc.error}"\n` : ''
        const loadingProp = mc.loading ? '  loading={true}\n' : ''
        return `import { MetricCard } from 'lowcode-charts'

<MetricCard
${valueProp}  label="${mc.label}"
${prefixProp}${suffixProp}${trendProp}  color="${mc.color}"
${errorProp}${loadingProp}/>`
      }
      case 'filter': {
        const fc = c as ConfigState['filter']
        const optionsProp = fc.showEmpty ? 'options={[]}' : 'options={filterOptions}'
        const errorProp = fc.error ? `  error="${fc.error}"\n` : ''
        const loadingProp = fc.loading ? '  loading={true}\n' : ''
        return `import { Filter } from 'lowcode-charts'
import { filterOptions } from './data'

<Filter
  ${optionsProp}
  value={filterValue}
  onChange={setFilterValue}
  label="${fc.label}"
  placeholder="${fc.placeholder}"
${errorProp}${loadingProp}/>`
      }
    }
  }, [activeComponent, config])

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('复制失败:', e)
    }
  }

  const renderPreview = () => {
    const c = config[activeComponent]
    switch (activeComponent) {
      case 'lineChart': {
        const lc = c as ConfigState['lineChart']
        return (
          <LineChart
            data={lc.showEmpty ? [] : lineChartData}
            xField={lc.xField}
            yField={lc.yField}
            color={lc.color}
            title={lc.title}
            loading={lc.loading}
            error={lc.error || null}
            emptyState={{
              title: '暂无销售数据',
              description: '当前时间段没有销售记录，请调整筛选条件后重试'
            }}
            errorState={{
              onRetry: () => updateConfig('lineChart', { error: '', loading: true }),
              ...(lc.error ? { description: lc.error } : {})
            } as any}
          />
        )
      }
      case 'barChart': {
        const bc = c as ConfigState['barChart']
        const yFields = bc.yField.split(',').map((s) => s.trim()).filter(Boolean)
        const colors = bc.color.split(',').map((s) => s.trim()).filter(Boolean)
        return (
          <BarChart
            data={bc.showEmpty ? [] : barChartDataMulti}
            xField={bc.xField}
            yField={yFields.length > 1 ? yFields : yFields[0] || 'value'}
            color={colors.length > 1 ? colors : colors[0] || '#1677ff'}
            title={bc.title}
            layout={bc.layout}
            loading={bc.loading}
            error={bc.error || null}
            emptyState={{
              title: '暂无产品数据',
              description: '产品数据加载中或为空，请稍后重试'
            }}
            errorState={{
              onRetry: () => updateConfig('barChart', { error: '', loading: true }),
              ...(bc.error ? { description: bc.error } : {})
            } as any}
          />
        )
      }
      case 'metricCard': {
        const mc = c as ConfigState['metricCard']
        return (
          <MetricCard
            value={mc.showEmpty ? '' as any : Number(mc.value) || mc.value}
            label={mc.label}
            prefix={mc.prefix || undefined}
            suffix={mc.suffix || undefined}
            trend={mc.trend ? Number(mc.trend) : undefined}
            color={mc.color}
            loading={mc.loading}
            error={mc.error || null}
            emptyState={{
              icon: '💰',
              title: '暂无指标数据',
              description: '数据正在加载或暂无记录'
            }}
            errorState={{
              onRetry: () => updateConfig('metricCard', { error: '', loading: true }),
              ...(mc.error ? { description: mc.error } : {})
            } as any}
          />
        )
      }
      case 'filter': {
        const fc = c as ConfigState['filter']
        return (
          <Filter
            options={fc.showEmpty ? [] : filterOptions}
            value={filterValue}
            onChange={setFilterValue}
            label={fc.label}
            placeholder={fc.placeholder}
            loading={fc.loading}
            error={fc.error || null}
            errorState={{
              onRetry: () => updateConfig('filter', { error: '', loading: true }),
              ...(fc.error ? { description: fc.error } : {})
            } as any}
          />
        )
      }
    }
  }

  const renderConfigPanel = () => {
    const c = config[activeComponent]
    switch (activeComponent) {
      case 'lineChart': {
        const lc = c as ConfigState['lineChart']
        return (
          <>
            <FormField label="标题">
              <input
                type="text"
                value={lc.title}
                onChange={(e) => updateConfig('lineChart', { title: e.target.value })}
              />
            </FormField>
            <FormField label="X轴字段">
              <input
                type="text"
                value={lc.xField}
                onChange={(e) => updateConfig('lineChart', { xField: e.target.value })}
              />
            </FormField>
            <FormField label="Y轴字段（多字段用逗号分隔）">
              <input
                type="text"
                value={lc.yField}
                onChange={(e) => updateConfig('lineChart', { yField: e.target.value })}
              />
            </FormField>
            <ColorPicker
              label="颜色"
              value={lc.color}
              onChange={(v) => updateConfig('lineChart', { color: v })}
            />
            <StateControls
              component="lineChart"
              config={lc}
              onUpdate={updateConfig}
            />
          </>
        )
      }
      case 'barChart': {
        const bc = c as ConfigState['barChart']
        return (
          <>
            <FormField label="标题">
              <input
                type="text"
                value={bc.title}
                onChange={(e) => updateConfig('barChart', { title: e.target.value })}
              />
            </FormField>
            <FormField label="X轴字段">
              <input
                type="text"
                value={bc.xField}
                onChange={(e) => updateConfig('barChart', { xField: e.target.value })}
              />
            </FormField>
            <FormField label="Y轴字段（多字段用逗号分隔）">
              <input
                type="text"
                value={bc.yField}
                onChange={(e) => updateConfig('barChart', { yField: e.target.value })}
              />
            </FormField>
            <ColorPicker
              label="颜色（多色用逗号分隔）"
              value={bc.color}
              onChange={(v) => updateConfig('barChart', { color: v })}
              multi
            />
            <FormField label="布局方向">
              <select
                value={bc.layout}
                onChange={(e) => updateConfig('barChart', { layout: e.target.value as any })}
              >
                <option value="vertical">垂直（纵向柱状图）</option>
                <option value="horizontal">水平（横向条形图）</option>
              </select>
            </FormField>
            <StateControls
              component="barChart"
              config={bc}
              onUpdate={updateConfig}
            />
          </>
        )
      }
      case 'metricCard': {
        const mc = c as ConfigState['metricCard']
        return (
          <>
            <FormField label="标签">
              <input
                type="text"
                value={mc.label}
                onChange={(e) => updateConfig('metricCard', { label: e.target.value })}
              />
            </FormField>
            <FormField label="数值">
              <input
                type="text"
                value={mc.value}
                onChange={(e) => updateConfig('metricCard', { value: e.target.value })}
              />
            </FormField>
            <FormField label="前缀（如¥、$）">
              <input
                type="text"
                value={mc.prefix}
                onChange={(e) => updateConfig('metricCard', { prefix: e.target.value })}
              />
            </FormField>
            <FormField label="后缀（如%、元）">
              <input
                type="text"
                value={mc.suffix}
                onChange={(e) => updateConfig('metricCard', { suffix: e.target.value })}
              />
            </FormField>
            <FormField label="趋势（百分比）">
              <input
                type="text"
                value={mc.trend}
                onChange={(e) => updateConfig('metricCard', { trend: e.target.value })}
                placeholder="如 12.5 或 -5"
              />
            </FormField>
            <ColorPicker
              label="主色调"
              value={mc.color}
              onChange={(v) => updateConfig('metricCard', { color: v })}
            />
            <StateControls
              component="metricCard"
              config={mc}
              onUpdate={updateConfig}
            />
          </>
        )
      }
      case 'filter': {
        const fc = c as ConfigState['filter']
        return (
          <>
            <FormField label="标签">
              <input
                type="text"
                value={fc.label}
                onChange={(e) => updateConfig('filter', { label: e.target.value })}
              />
            </FormField>
            <FormField label="占位符">
              <input
                type="text"
                value={fc.placeholder}
                onChange={(e) => updateConfig('filter', { placeholder: e.target.value })}
              />
            </FormField>
            <StateControls
              component="filter"
              config={fc}
              onUpdate={updateConfig}
            />
          </>
        )
      }
    }
  }

  return (
    <div className="playground">
      <header className="playground-header">
        <h1>低代码图表组件库</h1>
        <p>可视化配置组件属性，实时预览并一键复制代码</p>
      </header>

      <div className="playground-body">
        <aside className="playground-sidebar">
          <h3>选择组件</h3>
          <div className="component-list">
            {componentList.map((comp) => (
              <button
                key={comp.key}
                className={`component-item ${activeComponent === comp.key ? 'active' : ''}`}
                onClick={() => setActiveComponent(comp.key)}
              >
                <span className="component-icon">{comp.icon}</span>
                <span className="component-name">{comp.name}</span>
              </button>
            ))}
          </div>

          <div className="config-section">
            <h3>属性配置</h3>
            <div className="config-fields">
              {renderConfigPanel()}
            </div>
          </div>
        </aside>

        <main className="playground-main">
          <section className="preview-section">
            <div className="section-header">
              <h3>实时预览</h3>
              <span className="preview-hint">右侧修改属性，此处即时预览效果</span>
            </div>
            <div className="preview-content">
              {renderPreview()}
            </div>
          </section>

          <section className="code-section">
            <div className="section-header">
              <h3>生成代码</h3>
              <button className="copy-btn" onClick={copyCode}>
                {copied ? '✓ 已复制' : '📋 复制代码'}
              </button>
            </div>
            <pre className="code-block">
              <code>{generatedCode}</code>
            </pre>
          </section>
        </main>
      </div>
    </div>
  )
}

interface FormFieldProps {
  label: string
  children: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <div className="form-field">
    <label>{label}</label>
    <div className="form-control">{children}</div>
  </div>
)

interface ColorPickerProps {
  label: string
  value: string
  onChange: (v: string) => void
  multi?: boolean
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, multi }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <div className="color-picker">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
        />
        {!multi && (
          <div className="color-presets">
            {colorPresets.map((color) => (
              <button
                key={color}
                className={`color-swatch ${value === color ? 'active' : ''}`}
                style={{ background: color }}
                onClick={() => onChange(color)}
              />
            ))}
          </div>
        )}
        {multi && (
          <div className="color-presets">
            {colorPresets.map((color) => (
              <button
                key={color}
                className="color-swatch"
                style={{ background: color }}
                onClick={() => {
                  const current = value.split(',').map((s) => s.trim()).filter(Boolean)
                  if (current.includes(color)) {
                    onChange(current.filter((c) => c !== color).join(', '))
                  } else {
                    onChange([...current, color].join(', '))
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface StateControlsProps<K extends ComponentType> {
  component: K
  config: ConfigState[K]
  onUpdate: (key: K, patch: Partial<ConfigState[K]>) => void
}

function StateControls<K extends ComponentType>({ component, config, onUpdate }: StateControlsProps<K>) {
  return (
    <div className="state-controls">
      <label className="toggle-field">
        <input
          type="checkbox"
          checked={config.loading}
          onChange={(e) => onUpdate(component, { loading: e.target.checked } as any)}
        />
        <span>模拟加载中</span>
      </label>
      <label className="toggle-field">
        <input
          type="checkbox"
          checked={config.showEmpty}
          onChange={(e) => onUpdate(component, { showEmpty: e.target.checked } as any)}
        />
        <span>显示空状态</span>
      </label>
      <label className="toggle-field">
        <input
          type="checkbox"
          checked={!!config.error}
          onChange={(e) =>
            onUpdate(
              component,
              { error: e.target.checked ? '网络请求失败，请检查网络连接后重试' : '' } as any
            )
          }
        />
        <span>模拟加载失败</span>
      </label>
    </div>
  )
}

export default Playground
