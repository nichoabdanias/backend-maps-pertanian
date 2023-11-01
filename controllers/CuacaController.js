import axios from 'axios';
import moment from 'moment-timezone';

export const getWeatherData = async (req, res) => {
  const apiKey = 'c9dcd556a8c8cb1ad040379b8d0860a5'; // Ganti dengan API key OpenWeatherMap Anda
  const city = req.query.city; // Ambil kota dari query parameter

  try {
    const weatherData = await fetchWeatherData(apiKey, city);

    // Mengambil suhu aktual dalam derajat Celsius
    const temperatureCelsius = weatherData.main.temp;

    // Mengkonversi kecepatan angin dari m/s ke km/h
    const windSpeedKmh = (weatherData.wind.speed * 3.6).toFixed(2); // konversi m/s ke km/h dengan pembulatan 2 angka desimal

    // Mengambil waktu terkini (dalam UTC) dari respons API
    const utcTime = moment.unix(weatherData.dt); // Convert dari detik ke milidetik
    const localTime = utcTime.tz('Asia/Jakarta'); // Ganti 'Asia/Jakarta' dengan zona waktu Anda

    // Menghitung jam dan menit dalam format "7.31" sesuai dengan zona waktu lokal
    const formattedTime = `${localTime.format('H.mm')}`;

    // Filter data hanya untuk mendapatkan informasi yang diperlukan (suhu, kelembapan dan kecepatan angin)
    const formattedData = {
      Suhu: `${temperatureCelsius}°C`, // Menampilkan suhu dalam derajat Celsius,
      Kelembapan: `${weatherData.main.humidity}%`, // Menampilkan kelembapan dalam persen,
      Angin_TTL: `${windSpeedKmh} km/h`, // Menampilkan kecepatan angin dalam km/h
      jam: formattedTime, // Menampilkan waktu dalam format "15.48"
    };

    res.json({ cuaca: formattedData });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Gagal mengambil data cuaca.' });
  }
};

async function fetchWeatherData(apiKey, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await axios.get(apiUrl);
  return response.data;
}
