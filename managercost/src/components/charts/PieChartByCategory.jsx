import { PieChart, Pie, Tooltip, Legend } from "recharts";

const PieChartByCategory = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data for pie chart.</p>;
    }

    return (
        <PieChart width={450} height={300}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} />
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default PieChartByCategory;
