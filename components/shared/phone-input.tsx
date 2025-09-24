'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Country {
  code: string
  name: string
  flag: string
  dialCode: string
}

const countries: Country[] = [
  { code: 'SY', name: 'Syria', flag: 'https://flagcdn.com/sy.svg', dialCode: '+963' },
  { code: 'AE', name: 'United Arab Emirates', flag: 'https://flagcdn.com/ae.svg', dialCode: '+971' },
  { code: 'SK', name: 'Slovakia', flag: 'https://flagcdn.com/sk.svg', dialCode: '+421' },
  { code: 'US', name: 'United States', flag: 'https://flagcdn.com/us.svg', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: 'https://flagcdn.com/gb.svg', dialCode: '+44' },
  { code: 'DE', name: 'Germany', flag: 'https://flagcdn.com/de.svg', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: 'https://flagcdn.com/fr.svg', dialCode: '+33' },
  { code: 'IT', name: 'Italy', flag: 'https://flagcdn.com/it.svg', dialCode: '+39' },
  { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/es.svg', dialCode: '+34' },
  { code: 'SA', name: 'Saudi Arabia', flag: 'https://flagcdn.com/sa.svg', dialCode: '+966' },
  { code: 'EG', name: 'Egypt', flag: 'https://flagcdn.com/eg.svg', dialCode: '+20' },
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/in.svg', dialCode: '+91' },
  { code: 'PK', name: 'Pakistan', flag: 'https://flagcdn.com/pk.svg', dialCode: '+92' },
  { code: 'BD', name: 'Bangladesh', flag: 'https://flagcdn.com/bd.svg', dialCode: '+880' },
]

export interface PhoneInputProps {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onCountryChange?: (country: Country) => void
  error?: boolean
  helperText?: string
  required?: boolean
  disabled?: boolean
  className?: string
  defaultCountry?: string // Country code like 'SY', 'AE', etc.
}

export default function PhoneInput({
  id,
  name,
  label,
  placeholder = 'Enter phone number',
  value = '',
  onChange,
  onCountryChange,
  error = false,
  helperText,
  required = false,
  disabled = false,
  className,
  defaultCountry = 'SY' // Default to Syria
}: PhoneInputProps) {
  // Find default country or fallback to first country
  const initialCountry = countries.find(c => c.code === defaultCountry) || countries[0]
  
  const [selectedCountry, setSelectedCountry] = useState<Country>(initialCountry)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [phoneInput, setPhoneInput] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
    onCountryChange?.(country)
    
    // Update the full phone number
    const fullNumber = `${country.dialCode}${phoneInput}`
    onChange?.(fullNumber)
  }

  // Handle phone number input change
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value
    setPhoneInput(newPhoneNumber)
    
    // Update the full phone number
    const fullNumber = `${selectedCountry.dialCode}${newPhoneNumber}`
    onChange?.(fullNumber)
  }

  // Parse existing value to extract phone number without country code
  useEffect(() => {
    if (value && value.startsWith(selectedCountry.dialCode)) {
      const phoneWithoutCode = value.replace(selectedCountry.dialCode, '')
      setPhoneInput(phoneWithoutCode)
    } else if (!value) {
      setPhoneInput('')
    }
  }, [value, selectedCountry.dialCode])

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-[13px] text-[#333] mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        <div className={cn(
          "phone-input-container relative flex items-center h-11 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus-within:border-[#667eea] focus-within:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus-within:-translate-y-0.5 max-md:h-10",
          error && "border-red-500 focus-within:border-red-500",
          disabled && "opacity-50 cursor-not-allowed bg-gray-50",
          className
        )}>
          {/* Country Selector */}
          <div className="country-code-selector relative min-w-[85px] max-md:min-w-[100px] border-r border-[#E5E7EB] rounded-l-xl cursor-pointer transition-colors duration-300">
            <div 
              className="country-code-display flex items-center gap-0.5 px-1.5 py-3 max-md:px-3 text-[13px] text-[#374151]"
              onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="country-flag w-[18px] h-3 rounded-sm object-cover"
              />
              <span className="country-code-text font-medium">{selectedCountry.dialCode}</span>
              <ChevronDown className={cn(
                "dropdown-arrow ml-auto text-[#6B7280] transition-transform duration-300 w-3 h-3",
                isDropdownOpen && "rotate-180"
              )} />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && !disabled && (
              <div className="country-dropdown absolute top-full left-0 bg-white border border-[#E5E7EB] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-[1000] max-h-[300px] w-[300px] overflow-y-auto">
                <div className="country-list max-h-[250px] overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      className={cn(
                        "country-option flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-[#fafafa] border-none bg-none w-full text-left text-sm text-[#374151]",
                        selectedCountry.code === country.code && "bg-blue-50 text-[#3E5EC0]"
                      )}
                      onClick={() => handleCountrySelect(country)}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="flag w-5 h-[15px] rounded-sm object-cover"
                      />
                      <span className="name flex-1 font-medium">{country.name}</span>
                      <span className="code text-[#6B7280] text-xs">{country.dialCode}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            id={id}
            name={name}
            className="phone-number-input flex-1 border-none outline-none px-4 py-3 text-sm bg-transparent rounded-r-xl max-md:px-3 max-md:text-[13px] disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={phoneInput}
            onChange={handlePhoneInputChange}
            required={required}
            disabled={disabled}
          />
        </div>
      </div>
      
      {helperText && (
        <p className={cn(
          'mt-1 text-xs',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {helperText}
        </p>
      )}
    </div>
  )
}
