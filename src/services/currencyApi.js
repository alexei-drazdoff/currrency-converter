import axios from 'axios'

const API_URL = 'https://status.neuralgeneration.com/api/currency'

export const fetchCurrencyRates = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching currency rates:', error)
    throw error
  }
}