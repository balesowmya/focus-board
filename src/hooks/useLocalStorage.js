import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      if (saved !== null) {
        const parsed = JSON.parse(saved)
        return Array.isArray(parsed) ? parsed : initialValue
      }
    } catch (error) {
      console.error(`Could not read ${key} from localStorage.`, error)
    }
    return initialValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not save ${key} to localStorage.`, error)
    }
  }, [key, value])

  return [value, setValue]
}
