import { useState, useCallback } from 'react';

type DropdownType = 'filter' | 'audio' | null;

export const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);

  const toggleDropdown = useCallback((dropdownType: DropdownType) => {
    setActiveDropdown((current) => (current === dropdownType ? null : dropdownType));
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return {
    activeDropdown,
    toggleDropdown,
    closeDropdown,
  };
}; 