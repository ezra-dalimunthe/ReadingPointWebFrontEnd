<template>
  <div :class="[]">
    <div :class="['media align-items-stretch']">
      <div :class="['p-2', 'rounded-lg', 'text-center', 'bg-' + variant]">
        <b-icon :icon="icon" font-scale="4" :variant="iconVariant"></b-icon>
      </div>
      <div
        :class="[
          'p-2',
          'media-body',
          'text-white',
          'border-left',
          'bg-gradient-left-' + variant,
        ]"
      >
        <h2 class="text-right">{{ label }}</h2>
        <h3 class="text-bold-400 mb-0 text-right">{{ value }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StatsCard",
  props: {
    label: {
      type: String,
      default: "Statistic",
    },
    value: {
      type: [String, Number],
      default: "30",
    },
    icon: {
      type: String,
      default: "bar-chart",
    },
    iconVariant: {
      type: String,
      default: "white",
    },
    variant: {
      type: String,
      default: "white",
    },
  },
};
</script>
