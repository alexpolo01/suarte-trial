import Orders from "@/layouts/navigation/components/Orders";
import OrdersCompleted from "@/pages/orders/completed";
import OrderDetails from "@/pages/orders/order-details";
import OrdersPending from "@/pages/orders/pending";
import OrdersSent from "@/pages/orders/sent";

const OrderRoutes = [
  {
    element: <Orders/>,
    children: [
      { path: "/orders/pending", element: <OrdersPending/> },
      { path: "/orders/sent", element: <OrdersSent/> },
      { path: "/orders/completed", element: <OrdersCompleted/> },
    ]
  },

  { path: "/order/:orderNumber", element: <OrderDetails/> },
];

export default OrderRoutes;