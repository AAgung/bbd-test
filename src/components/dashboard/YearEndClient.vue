<script>
  import dateMixin from '../../mixins/dateMixin'
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['rangeDate'],
    data () {
      return {
        fromDate: typeof this.rangeDate === "undefined" ? "01 Jan 2020" : this.rangeDate.from,
        toDate: typeof this.rangeDate === "undefined" ? "07 Jan 2020" : this.rangeDate.to,
        chartData: {
            labels: null,
            datasets: [],
        },
        chartOptions: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
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
          this.chartData = {
            labels: null,
            datasets: [],
          };

          let rangeDate = this.getDatesFromRange(fromDate, toDate);
          await this.axios.get('/data/year-end.json')
                .then(res => {
                    // set labels
                    let rangeDateLabels = res.data.data.range_date;
                    this.chartData.labels = rangeDateLabels.filter(v => rangeDate.includes(this.validDate(new Date(v))));
                    
                    // set datasets for clients data
                    let clientData = res.data.data.metric.clicks;

                    // because in json doesn't have color for each client, set static from array;
                    let colorChart = [
                        '#fc8403', 
                        '#2554FF',
                        '#5e5d23',
                        '#75756e',
                        '#acd18c',
                        '#0aa80a',
                        '#7ca395',
                        '#5de8e1',
                        '#0a4469',
                        '#7607ed',
                        '#2a0057',
                        '#d791e3',
                        '#de1899',
                        '#4a0231',
                        '#d9092f',
                        '#210107',
                    ];
                    
                    for(const i in clientData) {
                        let yData = clientData[i].data.filter(v => rangeDate.includes(this.validDate(new Date(v[0]))));
                        this.chartData.datasets.push({
                            label: clientData[i].account_name,
                            data: yData.map(e => typeof e[1] === "undefined" ? 0 : e[1]),
                            fill: false,
                            borderColor: colorChart[i] || colorChart[1],
                            backgroundColor: colorChart[i] || colorChart[1],
                            borderWidth: 1
                        })
                    }
                });
          this.renderChart(this.chartData, this.chartOptions)
        }
    },
    mixins: [dateMixin]
  }
</script>