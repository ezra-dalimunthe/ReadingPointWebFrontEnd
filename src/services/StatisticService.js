import { BaseDataService } from "./BaseDataService";
export class StatisticService {
  constructor() {}
  get MemberStatistic() {
    return {
      dataService: new BaseDataService(process.env.VUE_APP_MEMBER_SERVICE_URL),
      memberByAge() {
        return this.dataService.get(`/api/v1/statistic/member-by-age`);
      },
      memberByGender() {
        return this.dataService.get(`/api/v1/statistic/member-by-gender`);
      },
    };
  }
  get BookStatistic() {
    return {
      dataService: new BaseDataService(process.env.VUE_APP_BOOK_SERVICE_URL),
      bookByStatus() {
        return this.dataService.get(`/api/v1/statistic/books-on-hand`);
      },
    };
  }
  get TransactionStatistic() {
    return {
      dataService: new BaseDataService(process.env.VUE_APP_BORROW_SERVICE_URL),
      borrowPerYear(year = null) {
        if (year == null) year = new Date().getFullYear();
        return this.dataService.get(
          `/api/v1/statistic/book-loan-transaction-by-year/${year}`
        );
      },
      returnPerYear(year = null) {
        if (year == null) year = new Date().getFullYear();
        return this.dataService.get(
          `/api/v1/statistic/book-return-transaction-by-year/${year}`
        );
      },
    };
  }
}
export const defaultChartDataPerYear = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,100],
    },
  ],
};
