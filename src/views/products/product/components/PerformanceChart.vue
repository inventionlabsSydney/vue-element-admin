<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/viewMixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ SalesData, PriceData, MarketPrice, StockLevel } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['Sales', 'Price', 'Market Price', 'Stock Level']
        },
        series: [{
          name: 'Sales', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: SalesData,
          animationDuration: 1800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'Price', itemStyle: {
            normal: {
              color: '#178BFF',
              lineStyle: {
                color: '#178BFF',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: PriceData,
          animationDuration: 1800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'Market Price', itemStyle: {
            normal: {
              color: '#E30AED',
              lineStyle: {
                color: '#E30AED',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: MarketPrice,
          animationDuration: 1800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'Stock Level', itemStyle: {
            normal: {
              color: '#ED0A7F',
              lineStyle: {
                color: '#ED0A7F',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: StockLevel,
          animationDuration: 1800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
