interface BadgeProps extends React.PropsWithChildren {
  color?: string
  icon?: React.ReactNode
}
export const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  color = 'bg-green-600'
}) => {
  return (
    <strong
      className={`rounded-lg inline-flex items-center gap-2 ${color} py-1 px-3 text-white`}
    >
      {icon && icon}
      <span className="text-[10px] font-medium sm:text-xs">{children}</span>
    </strong>
  )
}
