import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Component that takes `data` prop
const LineChartComponent = ({ data }) => {
    // Chart configuration can remain static or dynamic
    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--foreground))",
        },
    };

    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={data} // Use passed `data` prop
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="label" // Use `label` for X-axis from passed `data`
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Line
                    dataKey="completed" // Use `value` for Line's dataKey
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    );
};

export default LineChartComponent;
