import React from "react";

type CardHomeProps = {
  title: string;
  value: string;
  icon: any;
};

const CardHome = ({ title, value, icon }: CardHomeProps) => {
  const LinkIcon = icon;
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex items-center p-4">
        <LinkIcon className="w-6" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className="
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
      >
        {value}
      </p>
    </div>
  );
};

export default CardHome;
