import React from "react";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const RadialChart = ({ data }) => {
  // Static configuration for the chart
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))", // Update color as needed
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))", // Update color as needed
    },
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-3))", // Update color as needed
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart data={data} innerRadius={30} outerRadius={100}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        <PolarGrid gridType="circle" />
        <RadialBar dataKey="visitors" />
      </RadialBarChart>
    </ChartContainer>
  );
};

export default RadialChart;
