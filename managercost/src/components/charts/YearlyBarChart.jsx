import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const YearlyBarChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data for bar chart.</p>;
    }

    return (
        <BarChart width={650} height={300} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" />
        </BarChart>
    );
};

export default YearlyBarChart;
