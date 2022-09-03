<template>
  <b-row>
    <b-col :cols="labelWidth">
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
