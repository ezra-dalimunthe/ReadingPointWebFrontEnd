<template>
  <b-row class="mb-2">
    <b-col :cols="labelWidth" class="font-weight-bold ">
      {{ label }}
    </b-col>
    <b-col>:
      {{ value }}
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "DetailPart",
  props: {
    label: {
      type: String,
      default: "-",
    },
    value: {
      type: [String, Boolean, Number],
      default: "-",
    },
    labelWidth:{
        type:Number,
        default:3
    }
  },
};
</script>
