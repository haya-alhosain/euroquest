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

const countries: Country[] =  [
  { name: 'United Arab Emirates', code: '+971', flag: 'ae', dialCode: '971' },
  { name: 'Saudi Arabia', code: '+966', flag: 'sa', dialCode: '966' },
  { name: 'Kuwait', code: '+965', flag: 'kw', dialCode: '965' },
  { name: 'Qatar', code: '+974', flag: 'qa', dialCode: '974' },
  { name: 'Bahrain', code: '+973', flag: 'bh', dialCode: '973' },
  { name: 'Oman', code: '+968', flag: 'om', dialCode: '968' },
  { name: 'Jordan', code: '+962', flag: 'jo', dialCode: '962' },
  { name: 'Lebanon', code: '+961', flag: 'lb', dialCode: '961' },
  { name: 'Egypt', code: '+20', flag: 'eg', dialCode: '20' },
  { name: 'Morocco', code: '+212', flag: 'ma', dialCode: '212' },
  { name: 'Tunisia', code: '+216', flag: 'tn', dialCode: '216' },
  { name: 'Algeria', code: '+213', flag: 'dz', dialCode: '213' },
  { name: 'Libya', code: '+218', flag: 'ly', dialCode: '218' },
  { name: 'Sudan', code: '+249', flag: 'sd', dialCode: '249' },
  { name: 'Iraq', code: '+964', flag: 'iq', dialCode: '964' },
  { name: 'Syria', code: '+963', flag: 'sy', dialCode: '963' },
  { name: 'Yemen', code: '+967', flag: 'ye', dialCode: '967' },
  { name: 'Palestine', code: '+970', flag: 'ps', dialCode: '970' },
  { name: 'United States', code: '+1', flag: 'us', dialCode: '1' },
  { name: 'United Kingdom', code: '+44', flag: 'gb', dialCode: '44' },
  { name: 'Canada', code: '+1', flag: 'ca', dialCode: '1' },
  { name: 'Australia', code: '+61', flag: 'au', dialCode: '61' },
  { name: 'Germany', code: '+49', flag: 'de', dialCode: '49' },
  { name: 'France', code: '+33', flag: 'fr', dialCode: '33' },
  { name: 'Italy', code: '+39', flag: 'it', dialCode: '39' },
  { name: 'Spain', code: '+34', flag: 'es', dialCode: '34' },
  { name: 'Netherlands', code: '+31', flag: 'nl', dialCode: '31' },
  { name: 'Belgium', code: '+32', flag: 'be', dialCode: '32' },
  { name: 'Switzerland', code: '+41', flag: 'ch', dialCode: '41' },
  { name: 'Austria', code: '+43', flag: 'at', dialCode: '43' },
  { name: 'Sweden', code: '+46', flag: 'se', dialCode: '46' },
  { name: 'Norway', code: '+47', flag: 'no', dialCode: '47' },
  { name: 'Denmark', code: '+45', flag: 'dk', dialCode: '45' },
  { name: 'Finland', code: '+358', flag: 'fi', dialCode: '358' },
  { name: 'Poland', code: '+48', flag: 'pl', dialCode: '48' },
  { name: 'Czech Republic', code: '+420', flag: 'cz', dialCode: '420' },
  { name: 'Hungary', code: '+36', flag: 'hu', dialCode: '36' },
  { name: 'Romania', code: '+40', flag: 'ro', dialCode: '40' },
  { name: 'Bulgaria', code: '+359', flag: 'bg', dialCode: '359' },
  { name: 'Greece', code: '+30', flag: 'gr', dialCode: '30' },
  { name: 'Portugal', code: '+351', flag: 'pt', dialCode: '351' },
  { name: 'Ireland', code: '+353', flag: 'ie', dialCode: '353' },
  { name: 'India', code: '+91', flag: 'in', dialCode: '91' },
  { name: 'Pakistan', code: '+92', flag: 'pk', dialCode: '92' },
  { name: 'Bangladesh', code: '+880', flag: 'bd', dialCode: '880' },
  { name: 'Sri Lanka', code: '+94', flag: 'lk', dialCode: '94' },
  { name: 'Nepal', code: '+977', flag: 'np', dialCode: '977' },
  { name: 'China', code: '+86', flag: 'cn', dialCode: '86' },
  { name: 'Japan', code: '+81', flag: 'jp', dialCode: '81' },
  { name: 'South Korea', code: '+82', flag: 'kr', dialCode: '82' },
  { name: 'Singapore', code: '+65', flag: 'sg', dialCode: '65' },
  { name: 'Malaysia', code: '+60', flag: 'my', dialCode: '60' },
  { name: 'Thailand', code: '+66', flag: 'th', dialCode: '66' },
  { name: 'Vietnam', code: '+84', flag: 'vn', dialCode: '84' },
  { name: 'Philippines', code: '+63', flag: 'ph', dialCode: '63' },
  { name: 'Indonesia', code: '+62', flag: 'id', dialCode: '62' },
  { name: 'Brazil', code: '+55', flag: 'br', dialCode: '55' },
  { name: 'Argentina', code: '+54', flag: 'ar', dialCode: '54' },
  { name: 'Chile', code: '+56', flag: 'cl', dialCode: '56' },
  { name: 'Colombia', code: '+57', flag: 'co', dialCode: '57' },
  { name: 'Peru', code: '+51', flag: 'pe', dialCode: '51' },
  { name: 'Mexico', code: '+52', flag: 'mx', dialCode: '52' },
  { name: 'South Africa', code: '+27', flag: 'za', dialCode: '27' },
  { name: 'Nigeria', code: '+234', flag: 'ng', dialCode: '234' },
  { name: 'Kenya', code: '+254', flag: 'ke', dialCode: '254' },
  { name: 'Ghana', code: '+233', flag: 'gh', dialCode: '233' },
  { name: 'Ethiopia', code: '+251', flag: 'et', dialCode: '251' },
  { name: 'Uganda', code: '+256', flag: 'ug', dialCode: '256' },
  { name: 'Tanzania', code: '+255', flag: 'tz', dialCode: '255' },
  { name: 'Russia', code: '+7', flag: 'ru', dialCode: '7' },
  { name: 'Ukraine', code: '+380', flag: 'ua', dialCode: '380' },
  { name: 'Belarus', code: '+375', flag: 'by', dialCode: '375' },
  { name: 'Kazakhstan', code: '+7', flag: 'kz', dialCode: '7' },
  { name: 'Uzbekistan', code: '+998', flag: 'uz', dialCode: '998' },
  { name: 'Kyrgyzstan', code: '+996', flag: 'kg', dialCode: '996' },
  { name: 'Tajikistan', code: '+992', flag: 'tj', dialCode: '992' },
  { name: 'Turkmenistan', code: '+993', flag: 'tm', dialCode: '993' },
  { name: 'Azerbaijan', code: '+994', flag: 'az', dialCode: '994' },
  { name: 'Georgia', code: '+995', flag: 'ge', dialCode: '995' },
  { name: 'Armenia', code: '+374', flag: 'am', dialCode: '374' },
  { name: 'Turkey', code: '+90', flag: 'tr', dialCode: '90' },
  { name: 'Iran', code: '+98', flag: 'ir', dialCode: '98' },
  { name: 'Afghanistan', code: '+93', flag: 'af', dialCode: '93' }
];

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
