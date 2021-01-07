<template>
  <div>
    <div class="d-flex justify-content-between">
      <div><h3>List Client</h3></div>
      <div>
        <date-picker :value="rangeDate" v-model="rangeDate" lang="en" format="DD-MM-YYYY" range :editable="false"></date-picker>
      </div>
    </div>
    
    <div class="mt-2">
      <list-client :rangeDate="rangeDate" ref="listClient"></list-client>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import ListClient from '@/components/client/List'

export default {
  components: {
    DatePicker,
    ListClient
  },
  data() {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 6);
    const toDate = new Date();
    
    return {
      rangeDate: [
        fromDate,
        toDate,
      ],
    }
  },
  computed: {
    getRangeDate() {
      return {
        from: this.rangeDate[0],
        to: this.rangeDate[1],
      }
    }
  },
  watch: {
    rangeDate(val) {
      this.$refs.listClient.getData(val[0], val[1]);
    }
  }
}
</script>

<style>

</style>