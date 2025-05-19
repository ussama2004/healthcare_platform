import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  hoverable = false,
}) => {
  return (
    <div className={`card ${hoverable ? 'card-hover' : ''} ${className}`}>
      {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;