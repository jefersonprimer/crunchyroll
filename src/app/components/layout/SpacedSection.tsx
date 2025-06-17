import React from 'react';

interface SpacedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const SpacedSection: React.FC<SpacedSectionProps> = ({ children, className = '' }) => {
  return (
    <div className={`my-[50px] ${className}`}>
      {children}
    </div>
  );
};

export default SpacedSection; 

