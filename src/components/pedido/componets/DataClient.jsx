import React, { useState } from "react";
import { dateToLocalDate } from "../../../utils/dateFormat";
import { BsWhatsapp } from "react-icons/bs";
import { formatPrice } from "../../../utils/formatPrice";
import { Link, useParams } from "react-router-dom";

export const DataClient = ({ order, unpaidOrders }) => {
  const { id } = useParams();
  const [seeUnpaid, setSeeUnpaid] = useState(false);

  const totalDebt = unpaidOrders.reduce(
    (acc, curr) => acc + curr.payment.debt,
    0
  );

  return (
    <article className="pedido__card">
      <h3>Datos cliente</h3>
      <div className="row flex sb">
        <p>Zona</p>
        <p>{order.deliveryZone.name}</p>
      </div>
      <div className="row flex sb">
        <p>Dirección</p>
        <Link to={`/home/ubicacion/${id}`}>
          <div className="order__address">
            <img
              src="https://ik.imagekit.io/mrprwema7/location_home_BMvJcc21T.png?updatedAt=1688475436747"
              alt="icono"
            />

            <p>{order.shippingAddress.address}</p>
          </div>
        </Link>
      </div>
      <div className="row flex sb">
        <p>Teléfono</p>
        <a
          href={`https://api.whatsapp.com/send/?phone=${order.shippingAddress.phone}&text&type=phone_number&app_absent=0`}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "underline" }}
        >
          <BsWhatsapp /> {order.shippingAddress.phone}
        </a>
      </div>
      <div className="row flex sb">
        <p>Nombre</p>
        <p>
          {order.shippingAddress.name + " " + order.shippingAddress.lastName}
        </p>
      </div>
      <div className="row flex sb">
        <p>Creado</p>
        <p>{dateToLocalDate(order.createdAt)}hs</p>
      </div>
      <div className="row flex sb" style={{ color: "red", fontWeight: 800 }}>
        <p>
          Ordenes impagas{" "}
          <span
            style={{
              backgroundColor: "red",
              borderRadius: "50%",
              color: "white",
              padding: "3px 10px",
            }}
          >
            {unpaidOrders.length}
          </span>
        </p>

        <p
          style={{ textDecoration: "underline" }}
          onClick={() => setSeeUnpaid(!seeUnpaid)}
        >
          {formatPrice(totalDebt)} (ver)
        </p>
      </div>

      {seeUnpaid &&
        unpaidOrders.map((order) => (
          <div className="row flex sb">
            <p>{dateToLocalDate(order.deliveryDate)}hs</p>
            <p>
              {formatPrice(order.payment.debt)}{" "}
              <Link to={`/orderUnpaid/${order._id}`}>(Ver)</Link>
            </p>
          </div>
        ))}
    </article>
  );
};
