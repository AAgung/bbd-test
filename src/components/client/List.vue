<template>
  <div>
    <div class="table-responsive">
        <table id="table" class="table table-bordered">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama.</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(o, k) in tableData" :key="k">
                    <td>{{ o.no }}</td>
                    <td>{{ o.name }}</td>
                    <td>{{ o.total }}</td>
                </tr>
            </tbody>
        </table>
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
        tableData: [],
      }
    },
    mounted() {
      this.getData(this.fromDate, this.toDate);
    },
    methods: {
      async getData(fromDate, toDate) {
        this.tableData = [];

        let rangeDate = this.getDatesFromRange(fromDate, toDate);
        
        await this.axios.get('/data/year-end.json')
                .then(res => {
                    // set table data
                    let clientData = res.data.data.metric.clicks;

                    for(const i in clientData) {
                        let totalOrder = 0;
                        let orderData = clientData[i].data.filter(v => rangeDate.includes(this.validDate(new Date(v[0]))));
                        if(orderData.length > 0) {
                            orderData.map(e => {
                                totalOrder += (typeof e[1] === "undefined" ? 0 : e[1])
                            })
                        }
                        this.tableData = [...this.tableData, {
                            no: (parseInt(i) + 1),
                            name: clientData[i].account_name,
                            total: totalOrder 
                        }];
                    }
                });
        console.log(this.tableData);
      },
    },
    mixins: [dateMixin]
  }
</script>