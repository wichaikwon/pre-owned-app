import axios from 'axios';
import { pathBrandsAPI } from '../api';
import { Bounce, toast } from 'react-toastify';


export const createBrand = async (brandCode: string, brandName: string) => {
  try {
    const response = await axios.post(`${pathBrandsAPI}/brands/brand/create`, {
      brandCode: brandCode,
      brandName: brandName,
    });

    // ตรวจสอบค่า success ใน response body
    if (response.data.success) {
      toast.success('Brand created successfully!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
      });
      return { success: true, data: response.data.data };
    } else {
      // กรณี success เป็น false (มีข้อผิดพลาด)
      toast.error(response.data.error || 'Failed to create brand!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
      });
      return { success: false, error: response.data.error };
    }
  } catch (error: any) {
    // กรณีเกิดข้อผิดพลาดอื่นๆ (เช่น network error)
    toast.error('An unexpected error occurred.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    });
    return { success: false, error: 'An unexpected error occurred.' };
  }
};