'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Country {
  code: string
  name: string
  flag: string
  dialCode: string
}

const countries: Country[] = [
  // Middle East & Gulf
  { code: 'AE', name: 'United Arab Emirates', flag: 'https://flagcdn.com/ae.svg', dialCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', flag: 'https://flagcdn.com/sa.svg', dialCode: '+966' },
  { code: 'KW', name: 'Kuwait', flag: 'https://flagcdn.com/kw.svg', dialCode: '+965' },
  { code: 'QA', name: 'Qatar', flag: 'https://flagcdn.com/qa.svg', dialCode: '+974' },
  { code: 'BH', name: 'Bahrain', flag: 'https://flagcdn.com/bh.svg', dialCode: '+973' },
  { code: 'OM', name: 'Oman', flag: 'https://flagcdn.com/om.svg', dialCode: '+968' },
  { code: 'JO', name: 'Jordan', flag: 'https://flagcdn.com/jo.svg', dialCode: '+962' },
  { code: 'LB', name: 'Lebanon', flag: 'https://flagcdn.com/lb.svg', dialCode: '+961' },
  { code: 'SY', name: 'Syria', flag: 'https://flagcdn.com/sy.svg', dialCode: '+963' },
  { code: 'IQ', name: 'Iraq', flag: 'https://flagcdn.com/iq.svg', dialCode: '+964' },
  { code: 'YE', name: 'Yemen', flag: 'https://flagcdn.com/ye.svg', dialCode: '+967' },
  { code: 'PS', name: 'Palestine', flag: 'https://flagcdn.com/ps.svg', dialCode: '+970' },
  
  // North Africa
  { code: 'EG', name: 'Egypt', flag: 'https://flagcdn.com/eg.svg', dialCode: '+20' },
  { code: 'MA', name: 'Morocco', flag: 'https://flagcdn.com/ma.svg', dialCode: '+212' },
  { code: 'TN', name: 'Tunisia', flag: 'https://flagcdn.com/tn.svg', dialCode: '+216' },
  { code: 'DZ', name: 'Algeria', flag: 'https://flagcdn.com/dz.svg', dialCode: '+213' },
  { code: 'LY', name: 'Libya', flag: 'https://flagcdn.com/ly.svg', dialCode: '+218' },
  { code: 'SD', name: 'Sudan', flag: 'https://flagcdn.com/sd.svg', dialCode: '+249' },
  
  // North America
  { code: 'US', name: 'United States', flag: 'https://flagcdn.com/us.svg', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: 'https://flagcdn.com/ca.svg', dialCode: '+1' },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', flag: 'https://flagcdn.com/gb.svg', dialCode: '+44' },
  { code: 'DE', name: 'Germany', flag: 'https://flagcdn.com/de.svg', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: 'https://flagcdn.com/fr.svg', dialCode: '+33' },
  { code: 'IT', name: 'Italy', flag: 'https://flagcdn.com/it.svg', dialCode: '+39' },
  { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/es.svg', dialCode: '+34' },
  { code: 'NL', name: 'Netherlands', flag: 'https://flagcdn.com/nl.svg', dialCode: '+31' },
  { code: 'BE', name: 'Belgium', flag: 'https://flagcdn.com/be.svg', dialCode: '+32' },
  { code: 'CH', name: 'Switzerland', flag: 'https://flagcdn.com/ch.svg', dialCode: '+41' },
  { code: 'AT', name: 'Austria', flag: 'https://flagcdn.com/at.svg', dialCode: '+43' },
  { code: 'SE', name: 'Sweden', flag: 'https://flagcdn.com/se.svg', dialCode: '+46' },
  { code: 'NO', name: 'Norway', flag: 'https://flagcdn.com/no.svg', dialCode: '+47' },
  { code: 'DK', name: 'Denmark', flag: 'https://flagcdn.com/dk.svg', dialCode: '+45' },
  { code: 'FI', name: 'Finland', flag: 'https://flagcdn.com/fi.svg', dialCode: '+358' },
  { code: 'PL', name: 'Poland', flag: 'https://flagcdn.com/pl.svg', dialCode: '+48' },
  { code: 'CZ', name: 'Czech Republic', flag: 'https://flagcdn.com/cz.svg', dialCode: '+420' },
  { code: 'HU', name: 'Hungary', flag: 'https://flagcdn.com/hu.svg', dialCode: '+36' },
  { code: 'RO', name: 'Romania', flag: 'https://flagcdn.com/ro.svg', dialCode: '+40' },
  { code: 'BG', name: 'Bulgaria', flag: 'https://flagcdn.com/bg.svg', dialCode: '+359' },
  { code: 'GR', name: 'Greece', flag: 'https://flagcdn.com/gr.svg', dialCode: '+30' },
  { code: 'PT', name: 'Portugal', flag: 'https://flagcdn.com/pt.svg', dialCode: '+351' },
  { code: 'IE', name: 'Ireland', flag: 'https://flagcdn.com/ie.svg', dialCode: '+353' },
  { code: 'SK', name: 'Slovakia', flag: 'https://flagcdn.com/sk.svg', dialCode: '+421' },
  
  // Asia
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/in.svg', dialCode: '+91' },
  { code: 'PK', name: 'Pakistan', flag: 'https://flagcdn.com/pk.svg', dialCode: '+92' },
  { code: 'BD', name: 'Bangladesh', flag: 'https://flagcdn.com/bd.svg', dialCode: '+880' },
  { code: 'LK', name: 'Sri Lanka', flag: 'https://flagcdn.com/lk.svg', dialCode: '+94' },
  { code: 'NP', name: 'Nepal', flag: 'https://flagcdn.com/np.svg', dialCode: '+977' },
  { code: 'CN', name: 'China', flag: 'https://flagcdn.com/cn.svg', dialCode: '+86' },
  { code: 'JP', name: 'Japan', flag: 'https://flagcdn.com/jp.svg', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: 'https://flagcdn.com/kr.svg', dialCode: '+82' },
  { code: 'SG', name: 'Singapore', flag: 'https://flagcdn.com/sg.svg', dialCode: '+65' },
  { code: 'MY', name: 'Malaysia', flag: 'https://flagcdn.com/my.svg', dialCode: '+60' },
  { code: 'TH', name: 'Thailand', flag: 'https://flagcdn.com/th.svg', dialCode: '+66' },
  { code: 'VN', name: 'Vietnam', flag: 'https://flagcdn.com/vn.svg', dialCode: '+84' },
  { code: 'PH', name: 'Philippines', flag: 'https://flagcdn.com/ph.svg', dialCode: '+63' },
  { code: 'ID', name: 'Indonesia', flag: 'https://flagcdn.com/id.svg', dialCode: '+62' },
  { code: 'AF', name: 'Afghanistan', flag: 'https://flagcdn.com/af.svg', dialCode: '+93' },
  { code: 'IR', name: 'Iran', flag: 'https://flagcdn.com/ir.svg', dialCode: '+98' },
  
  // Oceania
  { code: 'AU', name: 'Australia', flag: 'https://flagcdn.com/au.svg', dialCode: '+61' },
  
  // South America
  { code: 'BR', name: 'Brazil', flag: 'https://flagcdn.com/br.svg', dialCode: '+55' },
  { code: 'AR', name: 'Argentina', flag: 'https://flagcdn.com/ar.svg', dialCode: '+54' },
  { code: 'CL', name: 'Chile', flag: 'https://flagcdn.com/cl.svg', dialCode: '+56' },
  { code: 'CO', name: 'Colombia', flag: 'https://flagcdn.com/co.svg', dialCode: '+57' },
  { code: 'PE', name: 'Peru', flag: 'https://flagcdn.com/pe.svg', dialCode: '+51' },
  { code: 'MX', name: 'Mexico', flag: 'https://flagcdn.com/mx.svg', dialCode: '+52' },
  
  // Africa
  { code: 'ZA', name: 'South Africa', flag: 'https://flagcdn.com/za.svg', dialCode: '+27' },
  { code: 'NG', name: 'Nigeria', flag: 'https://flagcdn.com/ng.svg', dialCode: '+234' },
  { code: 'KE', name: 'Kenya', flag: 'https://flagcdn.com/ke.svg', dialCode: '+254' },
  { code: 'GH', name: 'Ghana', flag: 'https://flagcdn.com/gh.svg', dialCode: '+233' },
  { code: 'ET', name: 'Ethiopia', flag: 'https://flagcdn.com/et.svg', dialCode: '+251' },
  { code: 'UG', name: 'Uganda', flag: 'https://flagcdn.com/ug.svg', dialCode: '+256' },
  { code: 'TZ', name: 'Tanzania', flag: 'https://flagcdn.com/tz.svg', dialCode: '+255' },
  
  // Eastern Europe & Central Asia
  { code: 'RU', name: 'Russia', flag: 'https://flagcdn.com/ru.svg', dialCode: '+7' },
  { code: 'UA', name: 'Ukraine', flag: 'https://flagcdn.com/ua.svg', dialCode: '+380' },
  { code: 'BY', name: 'Belarus', flag: 'https://flagcdn.com/by.svg', dialCode: '+375' },
  { code: 'KZ', name: 'Kazakhstan', flag: 'https://flagcdn.com/kz.svg', dialCode: '+7' },
  { code: 'UZ', name: 'Uzbekistan', flag: 'https://flagcdn.com/uz.svg', dialCode: '+998' },
  { code: 'KG', name: 'Kyrgyzstan', flag: 'https://flagcdn.com/kg.svg', dialCode: '+996' },
  { code: 'TJ', name: 'Tajikistan', flag: 'https://flagcdn.com/tj.svg', dialCode: '+992' },
  { code: 'TM', name: 'Turkmenistan', flag: 'https://flagcdn.com/tm.svg', dialCode: '+993' },
  { code: 'AZ', name: 'Azerbaijan', flag: 'https://flagcdn.com/az.svg', dialCode: '+994' },
  { code: 'GE', name: 'Georgia', flag: 'https://flagcdn.com/ge.svg', dialCode: '+995' },
  { code: 'AM', name: 'Armenia', flag: 'https://flagcdn.com/am.svg', dialCode: '+374' },
  { code: 'TR', name: 'Turkey', flag: 'https://flagcdn.com/tr.svg', dialCode: '+90' },
]

export interface PhoneInputProps {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onCountryChange?: (country: Country) => void
  onValidationChange?: (isValid: boolean) => void // New prop to notify parent about validation status
  error?: boolean
  helperText?: string
  required?: boolean
  disabled?: boolean
  className?: string
  defaultCountry?: string // Country code like 'SY', 'AE', etc.
  enableAutoDetect?: boolean // Enable automatic country detection from phone number
}

export default function PhoneInput({
  id,
  name,
  label,
  placeholder = 'Enter phone number',
  value = '',
  onChange,
  onCountryChange,
  onValidationChange,
  error = false,
  helperText,
  required = false,
  disabled = false,
  className,
  defaultCountry = 'SY', // Default to Syria
  enableAutoDetect = true
}: PhoneInputProps) {
  // Find default country or fallback to first country
  const initialCountry = countries.find(c => c.code === defaultCountry) || countries[0]
  
  const [selectedCountry, setSelectedCountry] = useState<Country>(initialCountry)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [phoneInput, setPhoneInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isSearching, setIsSearching] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries
    
    const query = searchQuery.toLowerCase()
    return countries.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query) ||
      country.dialCode.includes(query)
    )
  }, [searchQuery])

  // Phone number validation patterns for different countries
  const phoneValidationPatterns: Record<string, RegExp> = {
    // North America
    'US': /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    'CA': /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    
    // Europe
    'GB': /^\+44\d{10}$/,
    'DE': /^\+49[1-9]\d{9,10}$/,
    'FR': /^\+33[1-9]\d{8}$/,
    'IT': /^\+39[3]\d{8,9}$/,
    'ES': /^\+34[6-9]\d{8}$/,
    'NL': /^\+31[6]\d{8}$/,
    'BE': /^\+32[4]\d{7,8}$/,
    'CH': /^\+41[7-9]\d{8}$/,
    'AT': /^\+43[6]\d{7,8}$/,
    'SE': /^\+46[7]\d{8}$/,
    'NO': /^\+47[4-9]\d{7}$/,
    'DK': /^\+45[2-9]\d{7}$/,
    'FI': /^\+358[4-5]\d{7,8}$/,
    'PL': /^\+48[5-9]\d{8}$/,
    'CZ': /^\+420[6-9]\d{8}$/,
    'HU': /^\+36[2-3,6-9]\d{7,8}$/,
    'RO': /^\+40[7]\d{8}$/,
    'BG': /^\+359[8-9]\d{8}$/,
    'GR': /^\+30[6-9]\d{8}$/,
    'PT': /^\+351[9]\d{8}$/,
    'IE': /^\+353[8-9]\d{8}$/,
    'SK': /^\+421[9]\d{8}$/,
    'TR': /^\+90[5]\d{9}$/,
    
    // Middle East & Gulf
    'AE': /^\+971[5]\d{8}$/,
    'SA': /^\+966[5]\d{8}$/,
    'KW': /^\+965[569]\d{7}$/,
    'QA': /^\+974[3-7]\d{7}$/,
    'BH': /^\+973[3-9]\d{7}$/,
    'OM': /^\+968[7-9]\d{7}$/,
    'JO': /^\+962[7]\d{8}$/,
    'LB': /^\+961[3-9]\d{7}$/,
    'SY': /^\+963[9]\d{8}$/,
    'IQ': /^\+964[7]\d{9}$/,
    'YE': /^\+967[7]\d{8}$/,
    'PS': /^\+970[5]\d{8}$/,
    
    // North Africa
    'EG': /^\+20[1]\d{9}$/,
    'MA': /^\+212[6-7]\d{8}$/,
    'TN': /^\+216[2,4-5,9]\d{7}$/,
    'DZ': /^\+213[5-7]\d{8}$/,
    'LY': /^\+218[9]\d{8}$/,
    'SD': /^\+249[9]\d{8}$/,
    
    // Asia
    'IN': /^\+91[6-9]\d{9}$/,
    'PK': /^\+92[3]\d{9}$/,
    'BD': /^\+880[1]\d{9}$/,
    'LK': /^\+94[7]\d{8}$/,
    'NP': /^\+977[9]\d{8}$/,
    'CN': /^\+86[1]\d{10}$/,
    'JP': /^\+81[7-9]\d{8,9}$/,
    'KR': /^\+82[1]\d{8,9}$/,
    'SG': /^\+65[8-9]\d{7}$/,
    'MY': /^\+60[1]\d{8,9}$/,
    'TH': /^\+66[6-9]\d{8}$/,
    'VN': /^\+84[3,5-9]\d{8}$/,
    'PH': /^\+63[9]\d{9}$/,
    'ID': /^\+62[8]\d{9,10}$/,
    'AF': /^\+93[7]\d{8}$/,
    'IR': /^\+98[9]\d{9}$/,
    
    // Oceania
    'AU': /^\+61[4]\d{8}$/,
    
    // South America
    'BR': /^\+55[1-9]\d{10}$/,
    'AR': /^\+54[9]\d{10}$/,
    'CL': /^\+56[9]\d{8}$/,
    'CO': /^\+57[3]\d{9}$/,
    'PE': /^\+51[9]\d{8}$/,
    'MX': /^\+52[1]\d{9}$/,
    
    // Africa
    'ZA': /^\+27[6-8]\d{8}$/,
    'NG': /^\+234[8-9]\d{9}$/,
    'KE': /^\+254[7]\d{8}$/,
    'GH': /^\+233[2]\d{8}$/,
    'ET': /^\+251[9]\d{8}$/,
    'UG': /^\+256[7]\d{8}$/,
    'TZ': /^\+255[6-7]\d{8}$/,
    
    // Eastern Europe & Central Asia
    'RU': /^\+7[9]\d{9}$/,
    'UA': /^\+380[6-9]\d{8}$/,
    'BY': /^\+375[2,4,5,9]\d{7}$/,
    'KZ': /^\+7[7]\d{9}$/,
    'UZ': /^\+998[9]\d{8}$/,
    'KG': /^\+996[7]\d{8}$/,
    'TJ': /^\+992[9]\d{8}$/,
    'TM': /^\+993[6]\d{7}$/,
    'AZ': /^\+994[4-7,9]\d{8}$/,
    'GE': /^\+995[5]\d{8}$/,
    'AM': /^\+374[4-6,9]\d{7}$/,
  }

  // Function to validate phone number format
  const validatePhoneNumber = (phoneNumber: string, countryCode: string): boolean => {
    // Remove any spaces or special characters except +
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '')
    
    const pattern = phoneValidationPatterns[countryCode]
    if (!pattern) {
      // Basic validation for countries without specific patterns
      return cleanNumber.length >= 7 && cleanNumber.length <= 15 && cleanNumber.startsWith('+')
    }
    
    return pattern.test(cleanNumber)
  }

  // Auto-detect country from phone number
  const detectCountryFromPhone = (phoneNumber: string): Country | null => {
    if (!phoneNumber || !phoneNumber.startsWith('+')) return null
    
    // Find country by dial code
    const dialCode = phoneNumber.substring(0, 4) // Try 4 digits first
    let country = countries.find(c => phoneNumber.startsWith(c.dialCode))
    
    if (!country) {
      // Try 3 digits
      const dialCode3 = phoneNumber.substring(0, 3)
      country = countries.find(c => phoneNumber.startsWith(c.dialCode))
    }
    
    if (!country) {
      // Try 2 digits
      const dialCode2 = phoneNumber.substring(0, 2)
      country = countries.find(c => phoneNumber.startsWith(c.dialCode))
    }
    
    return country || null
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setIsSearching(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
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
    setIsSearching(false)
    setSearchQuery('')
    setHighlightedIndex(-1)
    onCountryChange?.(country)
    
    // Update the full phone number
    const fullNumber = `${country.dialCode}${phoneInput}`
    onChange?.(fullNumber)
    
    // Focus back to phone input
    setTimeout(() => {
      phoneInputRef.current?.focus()
    }, 100)
  }

  // Handle phone number input change with auto-detection
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value
    setPhoneInput(newPhoneNumber)
    
    // Auto-detect country if enabled and user types a full international number
    if (enableAutoDetect && newPhoneNumber.startsWith('+') && newPhoneNumber.length > 4) {
      const detectedCountry = detectCountryFromPhone(newPhoneNumber)
      if (detectedCountry && detectedCountry.code !== selectedCountry.code) {
        setSelectedCountry(detectedCountry)
        onCountryChange?.(detectedCountry)
        // Extract phone number without country code
        const phoneWithoutCode = newPhoneNumber.replace(detectedCountry.dialCode, '')
        setPhoneInput(phoneWithoutCode)
        onChange?.(newPhoneNumber)
        return
      }
    }
    
    // Update the full phone number
    const fullNumber = `${selectedCountry.dialCode}${newPhoneNumber}`
    onChange?.(fullNumber)
  }

  // Handle keyboard navigation in dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex])
        }
        break
      case 'Escape':
        setIsDropdownOpen(false)
        setIsSearching(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
        phoneInputRef.current?.focus()
        break
      case 'Tab':
        setIsDropdownOpen(false)
        setIsSearching(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
        break
    }
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setHighlightedIndex(-1)
  }

  // Handle country selector click
  const handleCountrySelectorClick = () => {
    if (disabled) return
    
    setIsDropdownOpen(!isDropdownOpen)
    if (!isDropdownOpen) {
      setIsSearching(true)
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
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

  // Notify parent component about validation status
  useEffect(() => {
    if (onValidationChange && phoneInput) {
      const isValid = validatePhoneNumber(`${selectedCountry.dialCode}${phoneInput}`, selectedCountry.code)
      onValidationChange(isValid)
    }
  }, [phoneInput, selectedCountry, onValidationChange])

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
              onClick={handleCountrySelectorClick}
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
              <div className="country-dropdown absolute top-full left-0 bg-white border border-[#E5E7EB] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-[1000] max-h-[300px] w-[300px] overflow-hidden">
                {/* Search Input */}
                <div className="search-container border-b border-[#E5E7EB] p-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search country..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyDown}
                      className="w-full pl-9 pr-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#667eea] focus:ring-1 focus:ring-[#667eea]"
                    />
                  </div>
                </div>

                {/* Country List */}
                <div className="country-list max-h-[200px] overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <button
                        key={country.code}
                        type="button"
                        className={cn(
                          "country-option flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-[#fafafa] border-none bg-none w-full text-left text-sm text-[#374151]",
                          selectedCountry.code === country.code && "bg-blue-50 text-[#3E5EC0]",
                          highlightedIndex === index && "bg-blue-100"
                        )}
                        onClick={() => handleCountrySelect(country)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="flag w-5 h-[15px] rounded-sm object-cover"
                        />
                        <span className="name flex-1 font-medium">{country.name}</span>
                        <span className="code text-[#6B7280] text-xs">{country.dialCode}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-[#6B7280] text-center">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            ref={phoneInputRef}
            type="tel"
            id={id}
            name={name}
            className="phone-number-input flex-1 border-none outline-none px-4 py-3 text-sm bg-transparent rounded-r-xl max-md:px-3 max-md:text-[13px] disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={phoneInput}
            onChange={handlePhoneInputChange}
            onKeyDown={handleKeyDown}
            required={required}
            disabled={disabled}
          />
        </div>
      </div>
      
      {(helperText || (enableAutoDetect && phoneInput && selectedCountry)) && (
        <p className={cn(
          'mt-1 text-xs',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {error ? helperText : (
            enableAutoDetect && phoneInput && selectedCountry && !validatePhoneNumber(`${selectedCountry.dialCode}${phoneInput}`, selectedCountry.code)
              ? `Invalid phone number format for ${selectedCountry.name}. Please check the correct format`
              : helperText
          )}
        </p>
      )}
    </div>
  )
}
