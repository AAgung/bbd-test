<template>
  <div>
    <hr>
    <span>
      <h2>Sales <span>{{ this.data.order_paid || 0 }} Paid Orders</span></h2>
      <h3>{{ this.data.today_sales || 0 }}</h3>  
    </span>
    <hr>
    <span>
      <h2>Cancel <span>{{ this.data.order_cancel || 0 }} Orders</span></h2>
      <h3>{{ this.data.total_cancel || 0 }}</h3>  
    </span>
    <hr>
    <span>
      <h2>Pending <span>{{ this.data.order_pending || 0 }} Orders</span></h2>
      <h3>{{ this.data.total_pending || 0 }}</h3>  
    </span>
    <hr>
  </div>
</template>

<script>
  export default {
    props: ['rangeDate'],
    data() {
      return {
        fromDate: this.rangeDate.from,
        toDate: this.rangeDate.to,
        data: {
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
        console.log(fromDate, toDate);
        await this.axios.get('/data/sales-overview.json')
                .then(res => this.data = res.data.data);
      }
    }
  }
</script>