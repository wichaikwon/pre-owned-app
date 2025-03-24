'use client'

import { createContext, FC, useContext, useState } from 'react'

interface ResultContextProps {
  result: number
  phoneData: string
  choiceName: string[]
  setPhoneData: (phoneData: string) => void
  setChoiceName: (ChoiceName: string[] | ((prev: string[]) => string[])) => void
  setResult: (result: number) => void
}

const ResultContext = createContext<ResultContextProps>({
  result: 0,
  phoneData: '',
  choiceName: [],
  setPhoneData: () => {},
  setChoiceName: () => {},
  setResult: () => {},
})

export const ResultProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<number>(0)
  const [choiceName, setChoiceName] = useState<string[]>([])
  const [phoneData, setPhoneData] = useState<string>('')
  return (
    <ResultContext.Provider value={{ result, setResult, choiceName, setChoiceName, phoneData, setPhoneData }}>
      {children}
    </ResultContext.Provider>
  )
}

export const useResult = () => {
  const context = useContext(ResultContext)
  if (!context) {
    throw new Error('useResult must be used within a ResultProvider')
  }
  return context
}
