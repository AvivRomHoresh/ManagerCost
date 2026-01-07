import { useEffect, useState } from "react";
import AddCostForm from "../components/costs/AddCostForm";
import CostList from "../components/costs/CostList";
import { addCost, deleteCost, getAllCosts } from "../db/idb";

export default function AddCostPage() {
    const [costs, setCosts] = useState([]);

    const load = async () => {
        const all = await getAllCosts();
        setCosts(all.sort((a, b) => (b.date || "").localeCompare(a.date || "")));
    };

    useEffect(() => {
        load();
    }, []);

    const handleAddCost = async (cost) => {
        await addCost(cost);
        await load();
    };

    const handleDelete = async (id) => {
        await deleteCost(id);
        await load();
    };

    return (
        <>
            <h1>Add Cost</h1>
            <AddCostForm onSubmit={handleAddCost} />

            <hr style={{ margin: "20px 0" }} />
            <h2>Costs</h2>
            <CostList costs={costs} onDelete={handleDelete} />
        </>
    );
}
