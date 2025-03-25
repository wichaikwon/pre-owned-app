import { fetchDefects } from '@/lib/defects/getDefect'
import React, { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (defectId: string, choiceCode: string, choiceName: string) => Promise<{ success: boolean; error?: string }>
}
const DefectChoiceModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDefect, setSelectedDefect] = useState<{
    id: string
    defectCode: string
    defectName: string
    isDeleted: boolean
  }>({
    id: '',
    defectCode: '',
    defectName: '',
    isDeleted: false,
  })
  const [defects, setDefects] = useState<{ id: string; defectCode: string; defectName: string; isDeleted: boolean }[]>([])
  const [searchDefect,setSearchDefect] = useState('')
  const [isOpenDefect, setIsOpenDefect] = useState(false)
  const [choiceCode, setChoiceCode] = useState('')
  const [choiceName, setChoiceName] = useState('')
  const filteredDefects = defects.filter(
    (defect) =>
      defect.defectCode.toLowerCase().includes(searchDefect.toLowerCase()) ||
    defect.defectName.toLowerCase().includes(searchDefect.toLowerCase())
  )
  const [error, setError] = useState<string | ''>('')

  if (!isOpen) return

  if (defects.length === 0) {
    fetchDefects().then((data) => {
      setDefects(data)
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await onSubmit(selectedDefect.id, choiceCode,choiceName)
    if (!result.success && result.error) {
      setError(result.error)
    } else {
      setError('')
      setChoiceCode('')
      setChoiceName('')
      setSelectedDefect({
        id: '',
        defectCode: '',
        defectName: '',
        isDeleted: false,
      })
      onClose()
    }
  }
  return (
    <div
      onClick={() => onClose()}
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50">
      <div className="flex w-3/12 flex-col gap-4 rounded-md bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <p className="flex justify-center text-2xl">Create DefectChoice</p>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <label>Defect Name</label>
            <div className="relative w-full">
              <button
                type="button"
                className="flex w-full rounded-md border p-2"
                onClick={() => setIsOpenDefect(!isOpenDefect)}>
                <p className={`${selectedDefect.defectName !== '' ? 'text-black' : 'text-gray-500'}`}>
                  {selectedDefect.defectCode && selectedDefect.defectName
                    ? `${selectedDefect.defectCode} - ${selectedDefect.defectName}`
                    : 'Select Defect'}
                </p>
              </button>
              {isOpenDefect && (
                <div
                  className={`absolute mt-0.5 ${defects.length <= 15 ? 'h-fit' : 'h-[312px]'} w-full overflow-y-auto rounded-md border bg-white p-2`}>
                  <input
                    className="mb-1 w-full rounded-md border p-2"
                    value={searchDefect}
                    placeholder="eg. 101 ,iPhone,Samsung"
                    onChange={(e) => setSearchDefect(e.target.value)}
                    autoFocus
                  />
                  {filteredDefects.length > 0 &&
                    filteredDefects.map(
                      (defect, idx) =>
                        !defect.isDeleted && (
                          <div
                            key={idx}
                            className={`flex flex-col items-center justify-between rounded-md`}
                            onClick={() => {
                              setSelectedDefect(defect)
                              setIsOpenDefect(false)
                            }}>
                            <button className="flex w-full p-2 hover:bg-gray-200">
                              <p className="flex w-full">
                                {defect.defectCode} - {defect.defectName}
                              </p>
                            </button>
                            <hr className="w-full p-1" />
                          </div>
                        )
                    )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Defect Code</label>
            <input
              className={`rounded-md border p-2 ${error ? 'border-red-500' : ''}`}
              onChange={(e) => setChoiceCode(e.target.value)}
              placeholder="e.g. 001, A002, B-003"
              type="text"
              value={choiceCode}
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Defect Name</label>
            <input
              value={choiceName}
              onChange={(e) => setChoiceName(e.target.value)}
              className="rounded-md border p-2"
              type="text"
              placeholder="e.g. iPhone 16 Pro, Galaxy S21 Ultra, 9 Pro"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              type="submit">
              Create
            </button>
            <button
              onClick={() => onClose()}
              className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DefectChoiceModal
