export const Input: React.FC<{
    id: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
    maxLength?: number
  }> = ({ id, type = 'text', value, onChange, placeholder, className, maxLength }) => (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 rounded-lg ${className}`}
      maxLength={maxLength}
    />
  )