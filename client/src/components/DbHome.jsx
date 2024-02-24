import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../redux/productSlice";
import { CChart } from "@coreui/react-chartjs";
import { statuses } from "../utils/styles";
const DbHome = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products == "") {
      getAllProducts().then((data) => dispatch(setAllProducts(data)));
    }
  });
  // console.log(products)
  // Filter items for Curries category
  let data = [];
  if (products !== "") {
    const curries = products.filter(
      (item) => item.product_category === "curries"
    );

    // Filter items for Biryani category
    const biryani = products.filter(
      (item) => item.product_category === "biryani"
    );

    // Filter items for Tandoori category
    const tandoori = products.filter(
      (item) => item.product_category === "tandoori"
    );

    // Filter items for Street category
    const street = products.filter(
      (item) => item.product_category === "street"
    );

    // Filter items for South category
    const south = products.filter((item) => item.product_category === "south");

    // Filter items for Bread category
    const bread = products.filter((item) => item.product_category === "bread");

    // Filter items for Sweets category
    const sweets = products.filter(
      (item) => item.product_category === "sweets"
    );

    // Filter items for Vegetarian category
    const vegetarian = products.filter(
      (item) => item.product_category === "vegetarian"
    );

    // Filter items for Snacks category
    const snacks = products.filter(
      (item) => item.product_category === "snacks"
    );

    // Filter items for Regional category
    const regional = products.filter(
      (item) => item.product_category === "regional"
    );

    // Filter items for Beverages category
    const beverages = products.filter(
      (item) => item.product_category === "beverages"
    );
    data = [
      curries?.length || 0,
      biryani?.length || 0,
      tandoori?.length || 0,
      street?.length || 0,
      south?.length || 0,
      bread?.length || 0,
      sweets?.length || 0,
      vegetarian?.length || 0,
      snacks?.length || 0,
      regional?.length || 0,
      beverages?.length || 0,
    ];
  }
  const labels = statuses.map((category) => category.title);
  console.log(data);
  return (
    <div className="flex items-center justify-center flex-col p-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "Category wise count",
                    backgroundColor: "#f87979",
                    data: data, // Add the data here
                  },
                ],
              }}
              labels="Food Type"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-600">
            <CChart
              type="doughnut"
              data={{
                labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                data,
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [40, 20, 80, 10],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DbHome;
