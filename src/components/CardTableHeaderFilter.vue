<template>
  <div class="d-flex justify-content-end">
    <b-input-group>
      <template #prepend>
        <b-dropdown :text="searchLabel" split variant="outline-primary">
          <b-dropdown-item
            v-for="item in filterFields"
            :key="item.label"
            :data-field="item.value"
            :data-label="item.label"
            @click="setFilter"
            >{{ item.label }}</b-dropdown-item
          >

          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button @click="onClear">
            Clear</b-dropdown-item-button
          >
        </b-dropdown>
      </template>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mb-sm-0"
        :placeholder="searchPlaceHolder"
        v-model="searchParam"
      ></b-form-input>
      <template #append>
        <b-button type="button" variant="outline-primary" @click="onSearch"
          >Cari</b-button
        >
      </template>
    </b-input-group>
  </div>
</template>
<script>
export default {
  name: "CardTableHeaderFilter",
  props: {
    filterFields: {
      type: Array,
      default: function () {
        return [{ label: "Label", value: "Value" }];
      },
    },
    searchPlaceHolder: {
      type: String,
      default: "Jane Done",
    },
  },
  data() {
    return {
      searchLabel: this.filterFields[0].label,
      searchParam: null,
      searchField: this.filterFields[0].value,
    };
  },
  methods: {
    setFilter(e) {
      this.searchField = e.currentTarget.getAttribute("data-field");
      this.searchLabel = e.currentTarget.getAttribute("data-label");
    },

    onSearch() {
      if (this.searchField && this.searchParam) {
        var filter = JSON.stringify({ [this.searchField]: this.searchParam });
        this.$emit("onSearch", filter);
      }
    },
    onClear() {
      this.searchParam = null;
      this.$emit("clear");
    },
  },
};
</script>
