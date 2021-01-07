export default {
    methods: {
        /**
         * use to change format date value from json data to YYYY-MM-DD format
         * ex: 01 Oct 2019 => 2019-10-01
         * ex value for date = 01 Oct 2019
         */
        validDate(date) {
            date = date.getFullYear() 
                        + '-' + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
                        + '-' + (date.getDate().toString().length == 2 ? date.getDate() : ('0' + date.getDate())) 
            return date;
        },
        /**
         * use get list dates from range dates
         * ex: 01 Oct 2019 - 07 Oct 2019 => [01, 02, 03, 04, 05, 06, 07] Oct 2019
         */
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