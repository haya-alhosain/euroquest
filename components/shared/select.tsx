import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'default' | 'filled' | 'outline'
  selectSize?: 'sm' | 'md' | 'lg'
  error?: boolean
  helperText?: string
  label?: string
  placeholder?: string
  options?: SelectOption[]
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  suppressHydrationWarning?: boolean
}

const selectVariants = {
  default: 'border-2 border-slate-200 bg-white focus:border-blue-500',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500',
  outline: 'border border-gray-300 bg-transparent focus:border-blue-500'
}

const selectSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-4 text-base'
}

export default function Select({
  variant = 'default',
  selectSize = 'md',
  error = false,
  helperText,
  label,
  placeholder,
  options = [],
  fullWidth = true,
  leftIcon,
  className,
  children,
  suppressHydrationWarning,
  ...props
}: SelectProps) {
  const baseStyles = 'appearance-none rounded-full font-medium text-gray-700 cursor-pointer transition-all duration-300 focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = selectVariants[variant]
  const sizeStyles = selectSizes[selectSize]
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  const widthStyles = fullWidth ? 'w-full' : ''
  const iconPaddingLeft = leftIcon ? 'pl-10' : ''

  return (
    <div className={fullWidth ? 'w-full' : 'inline-block'}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
            {leftIcon}
          </div>
        )}
        
        <select
          className={cn(
            baseStyles,
            variantStyles,
            sizeStyles,
            errorStyles,
            widthStyles,
            iconPaddingLeft,
            'pr-10', // Always add right padding for the chevron
            className
          )}
          suppressHydrationWarning={suppressHydrationWarning}
          {...props}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}
          
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          
          {children}
        </select>
        
        {/* Custom chevron icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown size={16} />
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
