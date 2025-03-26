import axios from 'axios'
import { pathDefectsAPI } from '../api'

export const fetchDefectChoices = async () => {
  try {
    const response = await axios.get(`${pathDefectsAPI}/defect-choices/defect-choices`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Defect Choices', error)
    return []
  }
}
export const fetchDefectChoice = async (id: string) => {
  try {
    const response = await axios.get(`${pathDefectsAPI}/defect-choices/defect-choice?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Defect Choice', error)
    return []
  }
}
