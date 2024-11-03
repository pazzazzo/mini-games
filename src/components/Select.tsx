export const Select: React.FC<{
    options: string[]
    value: string
    onChange: (value: string) => void
    blocked?: boolean
  }> = ({ options, value, onChange, blocked }) => (
    <select
      value={value}
      onChange={(e) => {!blocked && onChange(e.target.value)}}
      className={`px-4 py-2 border border-gray-600 rounded-lg ${blocked ? "cursor-not-allowed bg-gray-900 text-slate-600 select-none" : "bg-gray-700 text-white"}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option} disabled={blocked}>
          {option}
        </option>
      ))}
    </select>
  )