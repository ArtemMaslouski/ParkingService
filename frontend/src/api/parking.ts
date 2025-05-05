import axios from 'axios';

export const fetchParkingSpots = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/parking/spots`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке парковочных мест:', error);
    throw new Error('Не удалось загрузить парковочные места');
  }
};

export const fetchBusySlots = async (
  spotId: string
): Promise<{ [date: string]: number[] }> => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/busy-slots/${spotId}`
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке занятых слотов:', error);
    throw new Error('Не удалось загрузить занятые слоты');
  }
};

export const bookSlot = async (
  spotId: string,
  date: Date,
  hour: number
): Promise<void> => {
  try {
    const payload = {
      date: date.toISOString().slice(0, 10),
      hour: hour,
    };

    await axios.post(`${process.env.API_URL}/book/${spotId}`, payload);
  } catch (error) {
    console.error('Ошибка при бронировании слота:', error);
    throw new Error('Не удалось забронировать слот');
  }
};
