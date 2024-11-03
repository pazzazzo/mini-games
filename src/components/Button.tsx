export const Button: React.FC<{
    children: React.ReactNode
    onClick: () => void
    isReady: boolean
  }> = ({ children, onClick, isReady }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-4 py-2 font-semibold text-white rounded-lg ${
        isReady ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {children}
    </button>
  )