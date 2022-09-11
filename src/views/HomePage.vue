<template>
  <div>
    <h1>Dashboard</h1>
    <b-row class="mb-4">
      <b-col>
        <StatsCard
          label="Buku"
          :value="book_total"
          icon="book"
          variant="danger"
        >
        </StatsCard>
      </b-col>
      <b-col>
        <StatsCard
          label="Anggota"
          :value="member_total"
          icon="people"
          variant="info"
        >
        </StatsCard>
      </b-col>

      <b-col>
        <StatsCard
          label="Tersedia"
          :value="bookInHand"
          icon="box"
          variant="primary"
        >
        </StatsCard>
      </b-col>
      <b-col>
        <StatsCard
          label="Dipinjam"
          :value="bookOutHand"
          icon="box-arrow-right"
          variant="warning"
        >
        </StatsCard>
      </b-col>
    </b-row>
    <b-card-group deck>
      <b-card title="Peminjaman Buku">
        <LineChart :chartData="borrowPerYearDataset" :height="300" />
      </b-card>
      <b-card title="Pengembalian Buku">
        <LineChart :chartData="returnPerYearDataset" :height="300"/>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import {
  StatisticService,
  defaultChartDataPerYear,
} from "@/services/StatisticService";

import LineChart from "@/components/LineChart";
import StatsCard from "@/components/StatsCard";
export default {
  name: "HomePage",
  components: { StatsCard, LineChart },

  data() {
    return {
      book_total: 0,
      bookInHand: 0,
      bookOutHand: 0,
      member_total: 0,
      borrowPerYearDataset: Object.assign({}, defaultChartDataPerYear),
      returnPerYearDataset: Object.assign({}, defaultChartDataPerYear),
    };
  },
  methods: {
    getMemberByAge() {
      new StatisticService().MemberStatistic.memberByAge().then((payload) => {
        console.log(payload);
      });
    },
    getMemberByGender() {
      new StatisticService().MemberStatistic.memberByGender().then(
        (payload) => {
          this.member_total = payload.reduce((a, b) => {
            return a + b.total;
          }, 0);
        }
      );
    },
    getBookByStatus() {
      new StatisticService().BookStatistic.bookByStatus().then((payload) => {
        this.book_total = payload.copies;
        this.bookInHand = payload.inhand;
        this.bookOutHand = payload.outhand;
      });
    },
    getBorrowPerYear() {
      new StatisticService().TransactionStatistic.borrowPerYear().then(
        (payload) => {
          payload.datasets[0].backgroundColor = "#ff0000";
          this.borrowPerYearDataset = payload;
        }
      );
    },
    getReturnPerYear() {
      new StatisticService().TransactionStatistic.returnPerYear().then(
        (payload) => {
          payload.datasets[0].backgroundColor = "#0000ff";
          this.returnPerYearDataset = payload;
        }
      );
    },
  },
  mounted() {
   // this.getMemberByAge();
    this.getMemberByGender();
    this.getBookByStatus();
    this.getBorrowPerYear();
    this.getReturnPerYear();
  },
};
</script>
