<template>
  <div class="product-detail-container">
    <!-- Performance chart for sales, stock, price changes -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <h5>Weekly product market overview</h5>
      <line-chart :chart-data="performanceData" />
    </el-row>

    <!-- Competition table -->
    <el-row :gutter="32" style="background:#fff;padding:0px 0px 0;margin-bottom:32px;">
      <el-col :xs="48" :sm="48" :lg="17">
        <div class="app-container">
          <h5>Competition Watch</h5>
          <div class="filter-container">
            <el-input
              v-model="competition_watcher.query.company"
              placeholder="Competitor Name"
              style="width: 200px;"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleFilter"
            >
              Search
            </el-button>
            <el-button
              v-waves
              :loading="downloadLoading"
              class="filter-item"
              type="primary"
              icon="el-icon-download"
              @click="handleDownload"
            >
              Export
            </el-button>
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-edit"
              @click="handleCreateWatcher"
            >
              Add Watcher
            </el-button>
          </div>
          <competition-table
            :data="competition_watcher.items"
            :is-loading="competition_watcher.isLoading"
          />
          <pagination
            v-show="competition_watcher.total>competition_watcher.limit"
            :total="competition_watcher.total"
            :page.sync="competition_watcher.page"
            :limit.sync="competition_watcher.limit"
            @pagination="retrieveCompetitionData"
          />
        </div>
      </el-col>
      <el-col :xs="16" :sm="16" :lg="4" style="padding-top: 30px;">
        <h5>Product history</h5>
        <div class="block" style="padding-top: 80px;">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in product_timeline"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchWatchers, createWatcher, editWatcher, deleteWatcher } from '@/api/competition_watcher'
import LineChart from './components/PerformanceChart'
import CompetitionTable from './components/CompetitionTable'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Faker from 'faker'
function RandomDataSet(count) {
  var ret = []
  for (var i = 0; i < count; i++) {
    ret.push(Faker.random.number(30))
  }
  return ret
}
function RandomPriceSet(count) {
  var ret = []
  for (var i = 0; i < count; i++) {
    ret.push(Faker.commerce.price(10, 25))
  }
  return ret
}

/**
 * Obviously this will be taken from the product api as we track the performance
 **/
const demoLineData = {
  SalesData: RandomDataSet(7),
  PriceData: RandomPriceSet(7),
  MarketPrice: RandomPriceSet(7),
  StockLevel: RandomDataSet(7)

}
export default {
  name: 'Product',
  components: { LineChart, CompetitionTable, Pagination },
  data() {
    return {
      performanceData: demoLineData,
      competition_watcher: {
        items: [],
        total: 20,
        query: {
          page: 1,
          limit: 5,
          sort: '+id',
          company: undefined
        }
      },
      product_timeline: [{
        content: 'Sales Order',
        timestamp: '07-07-2019'
      }, {
        content: 'Price Change',
        timestamp: '07-07-2019'
      }, {
        content: 'Sales Order',
        timestamp: '06-07-2019'
      }, {
        content: 'Restocked',
        timestamp: '05-07-2019'
      }]
    }
  },
  created() {
    this.retrieveCompetitionData()
  },
  methods: {
    retrieveCompetitionData() {
      this.competition_watcher.isLoading = true
      fetchWatchers(this.competition_watcher.query).then(response => {
        this.competition_watcher.items = response.data.items
        this.competition_watcher.total = response.data.total
        this.competition_watcher.isLoading = false
      })
    },
    handleFilter() {
      this.competition_watcher.query.page = 1
      this.retrieveCompetitionData()
    },
    handleCreateWatcher() {
      createWatcher()
    },
    handleEditWatcher() {
      editWatcher()
    },
    handleDeleteWatcher() {
      deleteWatcher()
    }
  }
}
</script>
<style lang="scss" scoped>
.product-detail-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
