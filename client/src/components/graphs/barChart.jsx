import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Static chart configuration for styling
const chartConfig = {
    title: {
        label: "Title",
        color: "hsl(var(--text-background))",
    },
    frequency: {
        label: "Frequency",
        color: "hsl(var(--secondary-foreground))",
    },
    label: {
        color: "hsl(var(--background))",
    },
};

const BarChartComponent = ({ data }) => {
    return (
        <ChartContainer config={chartConfig}>
            <BarChart
                accessibilityLayer
                data={data}
                layout="vertical"
                margin={{
                    right: 16,
                }}
            >
                <CartesianGrid horizontal={false} />
                <YAxis
                    dataKey="title"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)} // Shorten the label for the Y-axis
                    hide
                />
                <XAxis dataKey="frequency" type="number" hide />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                    dataKey="frequency"
                    layout="vertical"
                    fill="var(--color-frequency)" // Color for the bars
                    radius={4}
                >
                    <LabelList
                        dataKey="title"
                        position="insideLeft"
                        offset={8}
                        className="fill-[--color-label]"
                        fontSize={12}
                    />
                    <LabelList
                        dataKey="frequency"
                        position="right"
                        offset={8}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
};

export default BarChartComponent;
