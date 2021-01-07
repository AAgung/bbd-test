<template>
  <div>
    <h3>Dashboard</h3>
    <header>
      <date-picker :value="rangeDate" v-model="rangeDate" lang="en" format="DD-MM-YYYY" range :editable="false"></date-picker>
    </header>
    
    <sales-overview :rangeDate="getRangeDate" ref="salesOverview"></sales-overview>
    <hr>
    <year-end-client :rangeDate="getRangeDate" ref="yearEndClient"></year-end-client>
    <hr>
    <year-end-client-bar :rangeDate="getRangeDate" ref="yearEndClientBar"></year-end-client-bar>
    <hr>
    <sales-overview-pie :rangeDate="getRangeDate" ref="salesOverviewPie"></sales-overview-pie>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import SalesOverview from '@/components/dashboard/SalesOverview';
import YearEndClient from '@/components/dashboard/YearEndClient';
import YearEndClientBar from '@/components/dashboard/YearEndClientBar';
import SalesOverviewPie from '@/components/dashboard/SalesOverviewPie.vue';

export default {
  components: {
    DatePicker,
    SalesOverview,
    YearEndClient,
    YearEndClientBar,
    SalesOverviewPie
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
      this.$refs.salesOverview.getData(val[0], val[1]);
      this.$refs.yearEndClient.getData(val[0], val[1]);
      this.$refs.yearEndClientBar.getData(val[0], val[1]);
      this.$refs.salesOverviewPie.getData(val[0], val[1]);
    }
  }
}
</script>