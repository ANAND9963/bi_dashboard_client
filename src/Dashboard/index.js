import React, { useState } from "react";
import Area from "./Visualization/Area"
import Bar from "./Visualization/Bar"
import "./CSS/Style.css"
import {CustomerGeoMap,OrderCountChart,RevenueChart_1,RevenueChart_2,SupplierCategoryDonutChart,TopSuppliersBarChart} from "./Visualization";
const Dashboard = () => {
  const [panels, setPanels] = useState([
    { id: 1, title: "CustomerGeoMap",component:<CustomerGeoMap/> },
    { id: 2, title: "OrderCountChart" ,component:<OrderCountChart/>},
    { id: 3, title: "RevenueChart_1" ,component:<RevenueChart_1 />},
    { id: 4, title: "RevenueChart_2" ,component:<RevenueChart_2 />},
    { id: 5, title: "SupplierCategoryDonutChart" ,component:<SupplierCategoryDonutChart/>},
    { id: 6, title: "TopSuppliersBarChart" ,component:<TopSuppliersBarChart/>}
  ]);
  return (
    <div>
       <div className="dashboard-grid">
        {panels.map((panel) => (
          <div key={panel.id} className="panel">
            <h3>{panel.title}</h3>
            {panel.component}
             </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;