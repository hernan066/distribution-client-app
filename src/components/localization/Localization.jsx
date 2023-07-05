/* eslint-disable no-undef */
import { useContext } from "react";
import { MapOrder } from "./MapOrder";
import "./localization.css";
import { LocationContext } from "../../context/LocationContext";
import { useEffect } from "react";
import { useState } from "react";

export const Localization = ({ order }) => {
  const [directions, setDirections] = useState(null);
  const { data: deliveryLocation } = useContext(LocationContext);
  const addressCoords = {
    lat: order.shippingAddress?.lat || -34.570428718491605,
    lng: order.shippingAddress?.lng || -58.743382510475065,
  };

  useEffect(() => {
    const fetchDirections = () => {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: deliveryLocation,
          destination: addressCoords,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        }
      );
    };
    fetchDirections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryLocation]);

  console.log(directions);

  return (
    <div className="localization__container">
      <div className="localization__map">
        <MapOrder
          data={deliveryLocation}
          directions={directions}
          addressCoords={addressCoords}
        />
      </div>
      <div className="localization__detail">
        <div className="localization__row">
          <div>
            <p>Distancia</p>
          </div>
          <div>
            <span className="localization__distance">
              {directions && directions.routes[0].legs[0].distance.text}
            </span>
          </div>
        </div>
        <div className="localization__row">
          <div>
            <p>Tiempo estimado</p>
          </div>
          <div>
            <span className="localization__time">
              {directions && directions.routes[0].legs[0].duration.text}
            </span>
          </div>
        </div>
        <div className="localization__row">
          <div>
            <p>Dirección</p>
            <p className="localization__text-grey">
              {order.shippingAddress.address}
            </p>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/mrprwema7/location_home_BMvJcc21T.png?updatedAt=1688475436747"
              alt="icono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
