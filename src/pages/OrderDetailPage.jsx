import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../api/apiOrders";
import { Layout } from "../components/layout/Layout";
import Loading from "../components/loading/Loading";
import { OrderDetail } from "../components/pedido/OrderDetail";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: l1 } = useGetOrderQuery(id);

  return (
    <Layout>
      {l1 ? <Loading /> : <OrderDetail order={orderData.data.order} id={id} />}
    </Layout>
  );
};
