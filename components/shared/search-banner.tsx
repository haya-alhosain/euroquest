'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { orderedMonths, durationOptions } from '@/constants'
import { useCategories, useCities } from '@/services/hooks'
import { RotateCcw, Search } from 'lucide-react'
import Button from './button'
import Input from './input'
import Select, { SelectOption as SelectOptionType } from './select'

// Field types
export type FieldType = 'select' | 'input' | 'date'

export interface FieldSelectOption {
  id: number | string
  title: string
  value?: string
}

export interface FieldConfig {
  name: string
  type: FieldType
  placeholder: string
  options?: FieldSelectOption[]
  required?: boolean
  className?: string
  variant?: 'default' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export interface ActionButton {
  type: 'submit' | 'reset' | 'button'
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
}

interface SearchBannerProps {
  fields?: FieldConfig[]
  actions?: ActionButton[]
  onSubmit?: (data: Record<string, string>) => void
  onReset?: () => void
  searchRoute?: string
  className?: string
  containerClassName?: string
  initialValues?: Record<string, string>
  resetBehavior?: 'navigate' | 'local' // 'navigate' for search page, 'local' for other pages
}

// Helper function to create default fields with API data
const createDefaultFields = (categories: any[] = [], cities: any[] = []): FieldConfig[] => [
  {
    name: 'category_slug',
    type: 'select',
    placeholder: 'Select Category',
    options: [
      ...categories.map(cat => ({
        id: cat.slug,
        title: cat.title,
        value: cat.slug
      }))
    ],
    required: false
  },
  {
    name: 'city_slug',
    type: 'select',
    placeholder: 'Select City',
    options: [
      ...cities.map(city => ({
        id: city.slug,
        title: city.title,
        value: city.slug
      }))
    ],
    required: false
  },
  {
    name: 'month',
    type: 'select',
    placeholder: 'Select Month',
    options: [
      ...orderedMonths.map(month => ({
        id: month.value,
        title: month.label,
        value: month.value
      }))
    ],
    required: false
  },
  {
    name: 'duration',
    type: 'select',
    placeholder: 'Select Duration',
    options: [
      ...durationOptions.map(option => ({
        id: option.value,
        title: option.label,
        value: option.value.toString()
      }))
    ],
    required: false
  }
]

// Default action buttons
const defaultActions: ActionButton[] = [
  {
    type: 'reset',
    label: 'Clear',
    icon: <RotateCcw size={14} />,
    variant: 'outline'
  },
  // {
  //   type: 'submit',
  //   label: 'Search',
  //   icon: <Search size={14} />,
  //   variant: 'primary'
  // }
]

export default function SearchBanner({
  fields,
  actions = defaultActions,
  onSubmit,
  onReset,
  searchRoute = '/search',
  className = '',
  containerClassName = '',
  initialValues = {},
  resetBehavior = 'navigate'
}: SearchBannerProps) {
  const router = useRouter()
  
  // Fetch categories and cities from API
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const { data: cities, isLoading: citiesLoading } = useCities()
  
  // Create dynamic fields based on API data
  const dynamicFields = fields || createDefaultFields(categories, cities)
  
  // Initialize form data based on provided fields and initial values
  const initialFormData = dynamicFields.reduce((acc, field) => {
    acc[field.name] = initialValues[field.name] || ''
    return acc
  }, {} as Record<string, string>)
  
  const [formData, setFormData] = useState<Record<string, string>>(initialFormData)
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [navigationParams, setNavigationParams] = useState<string>('')

  // Update form data when initialValues change
  useEffect(() => {
    const updatedFormData = dynamicFields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || ''
      return acc
    }, {} as Record<string, string>)
    
    // Only update if the values have actually changed
    const hasChanged = Object.keys(updatedFormData).some(
      key => updatedFormData[key] !== formData[key]
    )
    
    if (hasChanged) {
      setFormData(updatedFormData)
    }
  }, [initialValues, dynamicFields, formData])

  // Handle navigation after state update
  useEffect(() => {
    if (shouldNavigate && navigationParams) {
      router.push(`${searchRoute}?${navigationParams}`)
      setShouldNavigate(false)
      setNavigationParams('')
    }
  }, [shouldNavigate, navigationParams, router, searchRoute])

  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [name]: value
      }
      
      // Trigger search immediately when any field changes
      if (onSubmit) {
        // Use setTimeout to avoid calling setState during render
        setTimeout(() => onSubmit(newFormData), 0)
      } else {
        // Auto-navigate to search with current form data
        const searchParams = new URLSearchParams()
        Object.entries(newFormData).forEach(([key, val]) => {
          if (val) {
            // Map form data to API parameters
            if (key === 'category_slug') {
              searchParams.append('category_slug', val);
            } else if (key === 'city_slug') {
              searchParams.append('city_slug', val);
            } else if (key === 'month') {
              const currentYear = new Date().getFullYear();
              const monthFormatted = `${currentYear}-${val.padStart(2, '0')}`;
              searchParams.append('month', monthFormatted);
            } else {
              searchParams.append(key, val);
            }
          }
        })
        
        // Only navigate if there are search parameters
        if (searchParams.toString()) {
          setNavigationParams(searchParams.toString())
          setShouldNavigate(true)
        }
      }
      
      return newFormData
    })
  }, [onSubmit, router, searchRoute])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (onSubmit) {
      onSubmit(formData)
    } else {
      // Default behavior: navigate to search route
      const searchParams = new URLSearchParams()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value)
        }
      })
      router.push(`${searchRoute}?${searchParams.toString()}`)
    }
  }, [formData, onSubmit, router, searchRoute])

  const handleReset = useCallback(() => {
    const resetData = dynamicFields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {} as Record<string, string>)
    
    setFormData(resetData)
    
    // Handle reset behavior based on resetBehavior prop
    if (resetBehavior === 'navigate') {
      // Navigate to search page without any parameters (clear all filters)
      router.push(searchRoute)
    }
    // For 'local' behavior, we only reset the form data without navigation
    
    if (onReset) {
      onReset()
    }
  }, [dynamicFields, onReset, router, searchRoute, resetBehavior])

  const handleButtonClick = (action: ActionButton) => {
    if (action.type === 'reset') {
      handleReset()
    } else if (action.onClick) {
      action.onClick()
    }
  }

  // Convert FieldSelectOption to SelectOptionType
  const convertOptions = (options: FieldSelectOption[]): SelectOptionType[] => {
    return options.map(option => ({
      value: option.value !== undefined ? option.value : option.id.toString(),
      label: option.title,
      disabled: false
    }))
  }

  const renderField = (field: FieldConfig) => {
    const commonProps = {
      key: field.name,
      name: field.name,
      value: formData[field.name] || '',
      required: field.required,
      className: `flex-1 min-w-0 ${field.className || ''}`,
      variant: field.variant || 'default',
      fullWidth: true
    }
    
    switch (field.type) {
      case 'select':
        return (
          <Select
            {...commonProps}
            key={field.name}
            selectSize={field.size || 'md'}
            placeholder={field.placeholder}
            options={field.options ? convertOptions(field.options) : []}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        )
      
      case 'input':
        return (
          <Input
            {...commonProps}
            type="text"
            inputSize={field.size || 'md'}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        )
      
      case 'date':
        return (
          <Input
            {...commonProps}
            type="date"
            inputSize={field.size || 'md'}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`w-full mx-auto bg-white rounded-xl md:rounded-full p-3 md:pb-3 pb-[30px] shadow-[1px_1px_37px_0_rgba(62,94,192,0.35)] transform -translate-y-9 ${containerClassName}`}>
      <form onSubmit={handleSubmit} className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-2 ${className}`}>
        {/* Dynamic Fields */}
        {dynamicFields.map((field) => renderField(field))}

        {/* Dynamic Action Buttons */}
        {actions.length > 0 && (
          <div className="flex items-center gap-1 md:gap-2 mt-4 md:mt-0 justify-center md:justify-start md:static left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 -bottom-[17px] md:bottom-auto absolute">
            {actions.map((action, index) => (
              <Button
                key={index}
                type={action.type}
                variant={action.variant || 'primary'}
                size={action.size || 'md'}
                loading={action.loading}
                icon={action.icon}
                onClick={() => handleButtonClick(action)}
                className={`${action.className || ''} ${
                  actions.length > 1 && index === 0 
                    ? 'absolute md:static -bottom-6 md:bottom-auto left-1/2 md:left-auto transform -translate-x-full md:translate-x-0'
                    : actions.length > 1 && index === 1
                    ? 'absolute md:static -bottom-6 md:bottom-auto left-1/2 md:left-auto transform translate-x-1/4 md:translate-x-0'
                    : ''
                }`}
                title={action.label}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}
