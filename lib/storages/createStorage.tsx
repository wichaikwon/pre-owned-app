import { Bounce, toast } from "react-toastify"
import { pathStoragesAPI } from "../api"
import axios from "axios"

export const createStorage = async (storageCode: string, storageValue: string) => {
    try {
        const response = await axios.post(
        `${pathStoragesAPI}/storages/storage/create`,
        { storageCode, storageValue },
        { withCredentials: true }
        )
        if(response.data.success) {
        toast.success('Create Storage Success !!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
        })
        return { success: true, data: response.data.data }
        } else {
        toast.error(response.data.error || 'storageCode already exists', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
        })
        return { success: false, error: response.data.error }
        }
    } catch (error) {
        console.log('Error in createStorage:', error)
        toast.error('Failed to create Storage', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
        })
        return { success: false, error: 'Failed to create Storage' }
    }
    }