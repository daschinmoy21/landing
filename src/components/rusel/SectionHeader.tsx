import React from 'react';

interface SectionHeaderProps {
  title: React.ReactNode;
  accent?: React.ReactNode;
  children?: React.ReactNode;
  center?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, accent, children, center }) => (
  <div className={center ? 'max-w-2xl mx-auto text-center' : 'max-w-2xl'}>
    <h2 className="font-sans font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-[44px] leading-[1.08]">
      {title} {accent && <span className="text-[#3e7895]">{accent}</span>}
    </h2>
    {children && (
      <p className={`text-[17px] sm:text-lg font-medium leading-relaxed text-[#315a71] mt-3 max-w-[52ch] ${center ? 'mx-auto' : ''}`}>
        {children}
      </p>
    )}
  </div>
);
