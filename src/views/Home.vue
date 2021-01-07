<template>
  <div>
    <div class="d-flex justify-content-between">
      <div><h3>Dashboard</h3></div>
      <div>
        <date-picker :value="rangeDate" v-model="rangeDate" lang="en" format="DD-MM-YYYY" range :editable="false"></date-picker>
      </div>
    </div>

    <div>
      <sales-overview :rangeDate="getRangeDate" ref="salesOverview"></sales-overview>
    </div>

    <div class="row mt-4">
      <div class="col-lg-8 col-md-8 col-12">
        <div class="card">
          <year-end-client :rangeDate="getRangeDate" ref="yearEndClient"></year-end-client>
        </div>
        
        <div class="card mt-4">
          <year-end-client-bar :rangeDate="getRangeDate" ref="yearEndClientBar"></year-end-client-bar>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <div class="card">
          <summary-report :rangeDate="getRangeDate" ref="summaryReport"></summary-report>
        </div>

        <div class="card mt-4">
          <sales-overview-pie :rangeDate="getRangeDate" ref="salesOverviewPie"></sales-overview-pie>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import SalesOverview from '@/components/dashboard/SalesOverview';
import YearEndClient from '@/components/dashboard/YearEndClient';
import YearEndClientBar from '@/components/dashboard/YearEndClientBar';
import SalesOverviewPie from '@/components/dashboard/SalesOverviewPie.vue';
import SummaryReport from '@/components/dashboard/SummaryReport.vue';

export default {
  components: {
    DatePicker,
    SalesOverview,
    YearEndClient,
    YearEndClientBar,
    SalesOverviewPie,
    SummaryReport
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
      this.$refs.summaryReport.getData(val[0], val[1]);
      this.$refs.salesOverviewPie.getData(val[0], val[1]);
    }
  }
}
</script>