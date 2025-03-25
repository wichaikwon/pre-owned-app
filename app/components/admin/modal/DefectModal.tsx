import React, { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (defectCode: string, defectName: string) => Promise<{ success: boolean; error?: string }>
}

const DefectMaodal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [defectCode, setDefectCode] = useState('')
  const [defectName, setDefectName] = useState('')
  const [error, setError] = useState<string | ''>('')

  if (!isOpen) return

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await onSubmit(defectCode, defectName)
    if (!result.success && result.error) {
      setError(result.error)
    } else {
      setError('')
      setDefectCode('')
      setDefectName('')
      onClose()
    }
  }

  return (
    <div
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50"
      onClick={() => onClose()}>
      <div className="flex w-3/12 flex-col gap-4 rounded-md bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <p className="flex justify-center text-2xl">Create Brand</p>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <label>Defect Code</label>
            <input
              className={`rounded-md border p-2 ${error ? 'border-red-500' : ''}`}
              onChange={(e) => setDefectCode(e.target.value)}
              placeholder="e.g. 001, A002, B-003"
              type="text"
              value={defectCode}
              autoFocus
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Defect Name</label>
            <input
              value={defectName}
              onChange={(e) => setDefectName(e.target.value)}
              className="rounded-md border p-2"
              type="text"
              placeholder="e.g. Defect, Broken Screen"
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
              className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              type="button"
              onClick={() => onClose()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DefectMaodal
