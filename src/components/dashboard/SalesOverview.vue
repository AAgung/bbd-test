<template>
  <div>
    <hr>
    <span>
      <h2>Sales <span>{{ this.summaryData.order_paid || 0 }} Paid Orders</span></h2>
      <h3>{{ this.summaryData.today_sales || 0 }}</h3>  
    </span>
    <hr>
    <span>
      <h2>Cancel <span>{{ this.summaryData.order_cancel || 0 }} Orders</span></h2>
      <h3>{{ this.summaryData.total_cancel || 0 }}</h3>  
    </span>
    <hr>
    <span>
      <h2>Pending <span>{{ this.summaryData.order_pending || 0 }} Orders</span></h2>
      <h3>{{ this.summaryData.total_pending || 0 }}</h3>  
    </span>
    <hr>
  </div>
</template>

<script>
  import dateMixin from '../../mixins/dateMixin'

  export default {
    props: ['rangeDate'],
    data() {
      return {
        fromDate: this.rangeDate.from,
        toDate: this.rangeDate.to,
        summaryData: {
          order_paid: 0,
          today_sales: 0,
          total_cancel: 0,
          order_cancel: 0,
          total_pending: 0,
          order_pending: 0,
        },
      }
    },
    mounted() {
      this.getData(this.fromDate, this.toDate);
    },
    methods: {
      async getData(fromDate, toDate) {
        this.setNullData();
        
        let rangeDate = this.getDatesFromRange(fromDate, toDate);
        let rangeDateDt = [];
        
        await this.axios.get('/data/sales-overview.json')
                .then(res => {
                  rangeDateDt = res.data.data.filter(v => rangeDate.includes(this.validDate(new Date(v.tanggal))))
                });
        if(rangeDateDt.length > 0) {
          rangeDateDt.map(o => {
            this.summaryData.order_paid += o.data.order_paid;
            this.summaryData.today_sales += o.data.today_sales;
            this.summaryData.total_cancel += o.data.total_cancel;
            this.summaryData.order_cancel += o.data.order_cancel;
            this.summaryData.total_pending += o.data.total_pending;
            this.summaryData.order_pending += o.data.order_pending;
          });
        }

        // console.log(this.summaryData);
      },
      setNullData() {
        this.summaryData = {
          order_paid: 0,
          today_sales: 0,
          total_cancel: 0,
          order_cancel: 0,
          total_pending: 0,
          order_pending: 0,
        }
      }
    },
    mixins: [dateMixin]
  }
</script>