import { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';
import { useEffect, useState } from 'react';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState([0]);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);


  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      token: 'tok_visa',
      orderId: order.id,
    },
    onSuccess: (payment) => router.push('/orders'),
  });

  return timeLeft < 0 ? (
    <div>Order Expired</div>
  ): (
    <div>
      <h1>Order Details</h1>
      <h4>{order.ticket.title}</h4>
      <h4>{order.ticket.price}</h4>
      <h4>{timeLeft} seconds until order expires</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Pay
      </button>
    </div>
  );
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
