<template>
  <div class="d-flex justify-content-end">
    <b-input-group>
      <template #prepend>
        <b-dropdown :text="searchLabel" split variant="primary">
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
        v-on:keyup.enter="onSearch"
      ></b-form-input>
      <template #append>
        <b-button type="button" variant="primary" @click="onSearch"
          >Cari</b-button
        >
      </template>
    </b-input-group>
    <b-toast :id="`search_toast` + _uid" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">Pencarian</strong>
        </div>
      </template>
      {{ toast_message }}
    </b-toast>
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
      toast_message: "",
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
      } else {
        this.toast_message = "Keyword pencarian harus diisi.";
        this.$bvToast.show("search_toast" + this._uid);
      }
    },
    onClear() {
      this.searchParam = null;
      this.$emit("clear");
    },
  },
};
</script>
