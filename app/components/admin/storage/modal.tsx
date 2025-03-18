import React, { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (storageCode: string, storageName: string) => Promise<{ success: boolean; error?: string }>
}

const StorageModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [storageCode, setStorageCode] = useState('')
  const [storageName, setStorageName] = useState('')
  const [error, setError] = useState<string | ''>('')

  if (!isOpen) return

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await onSubmit(storageCode, storageName)
    if (!result.success && result.error) {
      setError(result.error)
    } else {
      setError('')
      setStorageCode('')
      setStorageName('')
      onClose()
    }
  }

  return (
    <div
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50"
      onClick={() => onClose()}>
      <div className="flex w-3/12 flex-col gap-4 rounded-md bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <p className="flex justify-center text-2xl">Create storage</p>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <label>Storage Code</label>
            <input
              className={`rounded-md border p-2 ${error ? 'border-red-500' : ''}`}
              onChange={(e) => setStorageCode(e.target.value)}
              placeholder="e.g. 001, A002, B-003"
              type="text"
              value={storageCode}
              autoFocus
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Storage Name</label>
            <input
              value={storageName}
              onChange={(e) => setStorageName(e.target.value)}
              className="rounded-md border p-2"
              type="text"
              placeholder="e.g. 16GB, 256GB, 1TB"
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

export default StorageModal
