<template>
  <el-table :data="tableData" height="270" style="width: 760px">
    <el-table-column prop="company" label="Compeditor" width="180" />
    <el-table-column prop="current_price" label="Current Price" width="120" />
    <el-table-column prop="previous_price" label="Previous Price" width="120" />
    <el-table-column prop="stock_level" label="Stock Level" width="100" />
    <el-table-column label="Operations">
      <template slot-scope="scope">
        <el-button size="mini" type="info" @click="handleDetail(scope.$index, scope.row)">Detail</el-button>
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Faker from 'faker'
function generateData(count) {
  var ret = []
  for (var i = 0; i < count; i++) {
    ret.push({
      company: Faker.company.companyName(0),
      current_price: Faker.commerce.price(10, 35, 2, '$'),
      previous_price: Faker.commerce.price(10, 35, 2, '$'),
      stock_level: Faker.random.number(50)
    })
  }
  return ret
}
export default {
  data() {
    return {
      tableData: generateData(5)
    }
  },

  methods: {
    handleDetail(index, row) {
      console.log('handle detail modal')
    },
    handleEdit(index, row) {
      console.log('handle edit modal')
    },
    handleDelete(index, row) {
      console.log('handle delete')
    }
  }
}
</script>
