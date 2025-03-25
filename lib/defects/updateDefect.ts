import axios from 'axios'
import { pathDefectsAPI } from '../api'

export const updateDefect = async (id: string, defectName: string) => {
  try {
    const response = await axios.put(`${pathDefectsAPI}/defects/defects/update?id=${id}`, {
      defectName,
    })
    return response.data
  } catch (error) {
    return []
  }
}
