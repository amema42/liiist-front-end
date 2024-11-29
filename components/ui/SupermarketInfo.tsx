import React from 'react';

interface SupermarketInfoProps {
  data: {
    name: string;
    street: string;
    lat: string;
    long: string;
    city: string;
    working_hours: string;
    picks_up_in_shop: boolean;
    zip_code: string;
  };
}

const SupermarketInfo: React.FC<SupermarketInfoProps> = ({ data }) => {
  return (
    <div className="supermarket-info">
      <h1 className="supermarket-name">{data.name}</h1>
      <p className="supermarket-location">
        {data.street}, {data.city}, {data.zip_code}
      </p>
      <p className="supermarket-hours">Orari di apertura: {data.working_hours}</p>
      <p className="pickup-info">
        {data.picks_up_in_shop ? "Ritiro in negozio disponibile" : "Ritiro in negozio non disponibile"}
      </p>
    </div>
  );
};

export default SupermarketInfo;
