import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

export default function DiamondPrice() {
  const col = (title) => {
    return (
      <th
        scope="col"
        className={`text-xs text-black font-medium px-6 py-3 text-left uppercase tracking-wider`}
      >
        {title}
      </th>
    );
  };
  const row = (data, unit) => {
    return (
      <td className={`text-sm text-black px-6 py-4 whitespace-nowrap`}>
        {data}
        {unit}
      </td>
    );
  };
  const [loading, setLoading] = useState(true);
  const [gemData, setGemData] = useState([]);
  const [apiUrl, setApiUrl] = useState(
    "https://6f2e-2402-9d80-3e2-2411-2966-95bf-f25c-8970.ngrok-free.app/api/GemPriceList/FilterGemPriceList"
  );
  const prevApiUrl = React.useRef(apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGemData(data);
        console.log({ data });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <RingLoader size={100} color="#54cc26" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="py-2 min-w-full">
            <div className="overflow-hidden flex justify-center items-center">
              <table className="w-[90vw] table-auto border border-green-700">
                {/* Cols */}
                <thead className="bg-green-200">
                  <tr>
                    {col("Origin")}
                    {col("CaratWeight")}
                    {col("Color")}
                    {col("Cut")}
                    {col("Clarity")}
                    {col("Price")}
                    {col("EffDate")}
                  </tr>
                </thead>
                <tbody>
                  {gemData.map((gem, index) => (
                    <tr key={index} className="bg-green-50 border-b">
                      {row(gem.Origin)}
                      {row(gem.CaratWeight)}
                      {row(gem.Color)}
                      {row(gem.Cut)}
                      {row(gem.Clarity)}
                      {row(parseFloat(gem.Price).toFixed(2), "$")}
                      {row(gem.EffDate)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
