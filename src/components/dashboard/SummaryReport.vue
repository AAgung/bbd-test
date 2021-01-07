<template>
  <div class="row mt-2">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <b-icon icon="credit-card" variant="success"></b-icon> 
            Total Sales <small class="text text-success"><strong>{{ this.summaryData.order_paid || 0 }} Orders</strong></small>
            </h5>
          <h6 class="card-subtitle mb-2 text-muted"><span>Rp. {{ this.summaryData.today_sales || 0 }}</span></h6>
        </div>
      </div>
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">
            <b-icon icon="arrow-counterclockwise" variant="danger"></b-icon> 
            Total Cancel <small class="text text-danger"><strong>{{ this.summaryData.order_cancel || 0 }} Orders</strong></small>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted"><span>Rp. {{ this.summaryData.total_cancel || 0 }}</span></h6>
        </div>
      </div>
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">
            <b-icon icon="cart" variant="warning"></b-icon> 
            Total Pending <small class="text text-warning"><strong>{{ this.summaryData.order_pending || 0 }} Orders</strong></small>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted"><span>Rp. {{ this.summaryData.total_pending || 0 }}</span></h6>
        </div>
      </div>
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">
            <b-icon icon="cart" variant="primary"></b-icon> 
            Total Shipping
          </h5>
          <h6 class="card-subtitle mb-2 text-muted"><span>Rp. {{ this.summaryData.total_shipping || 0 }}</span></h6>
        </div>
      </div>
    </div>
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
          total_shipping: 0,
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
            this.summaryData.total_shipping += o.data.total_shipping;
          });
        }
      },
      setNullData() {
        this.summaryData = {
          order_paid: 0,
          today_sales: 0,
          total_cancel: 0,
          order_cancel: 0,
          total_pending: 0,
          order_pending: 0,
          total_shipping: 0,
        }
      }
    },
    mixins: [dateMixin]
  }
</script>

<style lang="css" scoped>
    .card {
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    }
</style>