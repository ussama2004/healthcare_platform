import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return <h3 className={`text-lg font-semibold leading-6 text-gray-900 dark:text-white ${className}`}>{children}</h3>;
};

const CardDescription = ({ children, className = '' }: CardDescriptionProps) => {
  return <p className={`mt-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}>{children}</p>;
};

const CardContent = ({ children, className = '' }: CardContentProps) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return <div className={`px-6 py-4 bg-gray-50 dark:bg-gray-900 ${className}`}>{children}</div>;
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;