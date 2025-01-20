import axios from "axios";
import { useEffect, useState } from "react";

function OrderList() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/orders`)
      .then((response) => {
        setOrderList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="flex w-52 flex-col gap-4 items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
          <p className="text-xl font-bold text-info">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-5">
      <h1 className="text-3xl font-bold text-center">OrderList</h1>
      <div className="overflow-x-auto my-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200 shadow-xl rounded-lg">
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Sevices</th>
              <th className="text-center">Status</th>
              <th className="text-center">transactionId</th>
              <th className="text-center">Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td className="whitespace-nowrap">{order.user.name}</td>
                <td className="whitespace-nowrap">{order.user.email}</td>
                <td className="whitespace-nowrap">{order.orderItem}</td>
                <td className="whitespace-nowrap">
                  {order.paymentResult.status}
                </td>
                <td className="break-all">{order.paymentResult.id}</td>
                <td>
                  {new Date(order.paymentResult.update_time).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    }
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
