export default {
    methods: {
        validDate(date) {
            date = date.getFullYear() 
                        + '-' + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
                        + '-' + (date.getDate().toString().length == 2 ? date.getDate() : ('0' + date.getDate())) 
            return date;
        },
        getDatesFromRange(fromDate, toDate) {
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
    
            let dates = [];
            while (fromDate < toDate) {
                dates = [...dates, this.validDate(fromDate)];
                fromDate.setDate(fromDate.getDate() + 1);
            }
            dates = [...dates, this.validDate(toDate)];
            return dates;
        },
    }
}