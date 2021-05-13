export interface ChartOptions {
  legend: {
    position?: string,
    onHover?: Function,
    labels?: {boxWidth: number, fontSize: number},
    display?: boolean
  },
  hover?: {onHover: Function}
}
