type LogLevel = 'error' | 'log'

interface IDevLogProps {
  type?: LogLevel
  message: string
}

export function devLog({ message, type = 'log' }: IDevLogProps) {
  if (process.env.NODE_ENV === 'production') return

  if (type === 'error') {
    console.error(message)
  } else {
    console.log(message)
  }
}
