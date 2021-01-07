<script>
  import dateMixin from '../../mixins/dateMixin'
  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    props: ['rangeDate'],
    data () {
      return {
        fromDate: typeof this.rangeDate === "undefined" ? "01 Jan 2020" : this.rangeDate.from,
        toDate: typeof this.rangeDate === "undefined" ? "07 Jan 2020" : this.rangeDate.to,
        chartData: {
          labels: ["Paid", "Cancel", "Pending"],
          datasets: []
        },
        chartOptions: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.getData(this.fromDate, this.toDate);
    },
    methods: {
      async getData(fromDate, toDate) {
        this.chartData.datasets = [];

        let rangeDate = this.getDatesFromRange(fromDate, toDate);
        let rangeDateDt = [];
        let totalOrderPaid = 0;
        let totalOrderCancel = 0;
        let totalOrderPending = 0;

        await this.axios.get('/data/sales-overview.json')
                .then(res => {
                  rangeDateDt = res.data.data.filter(v => rangeDate.includes(this.validDate(new Date(v.tanggal))))
                });
        if(rangeDateDt.length > 0) {
          rangeDateDt.map(o => {
            totalOrderPaid += o.data.order_paid;
            totalOrderCancel += o.data.order_cancel;
            totalOrderPending += o.data.order_pending;
          });

          this.chartData.datasets = [
            {
              borderWidth: 1,
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              data: [totalOrderPaid, totalOrderCancel, totalOrderPending]
            }
          ]
        }
        this.renderChart(this.chartData, this.chartOptions)
      },
    },
    mixins: [dateMixin]
  }
</script>