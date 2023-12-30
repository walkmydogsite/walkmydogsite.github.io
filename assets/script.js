const languageData = {
  en: {
    suggestionIntro: "Based on the current weather conditions, you might consider wearing:",
    suggestionOutro: "It's always better to be overdressed than underdressed. Be prepared for slight changes in weather and have an additional layer to keep you comfortable if needed.",
    currentWeatherConditions: "Current Weather Conditions",
    currentTemperature: "Current Temperature",
    cloudiness: "Cloudiness",
    humidity: "Humidity",
    temperatureRange: "Temperature Range for the Next 4 Hours",
    casual: "Casual",
    'semi-formal': "Semi-formal",
    formal: "Formal",
    comfort: "Comfort",
    male: "Male",
    female: "Female"
  },
  es: {
    suggestionIntro: "Basado en las condiciones climáticas actuales, podrías considerar llevar:",
    suggestionOutro: "Es mejor estar un poco más abrigado que pasarlo frío. Prepárate para posibles cambios en el clima y añade una capa adicional para mantenerte cómodo si es necesario.",
    currentWeatherConditions: "Condiciones Climáticas Actuales",
    currentTemperature: "Temperatura Actual",
    cloudiness: "Nubosidad",
    humidity: "Humedad",
    temperatureRange: "Rango de Temperatura para las Próximas 4 Horas",
    casual: "Casual",
    'semi-formal': "Semi-formal",
    formal: "Formal",
    comfort: "Comfort",
    male: "Hombre",
    female: "Mujer"
  }
};

const clothingOptions = {
  casual: {
    male: {
      cold: {
        tops: ['Sweater', 'Jacket', 'Hoodie'],
        bottoms: ['Jeans', 'Chinos', 'Jogging pants'],
      },
      moderate: {
        tops: ['T-shirt', 'Shirt', 'Sweater', 'Jacket', 'Polo shirt'],
        bottoms: ['Jeans', 'Chinos', 'Shorts', 'Jogging pants'],
      },
      hot: {
        tops: ['T-shirt', 'Shirt', 'Jacket', 'Polo shirt'],
        bottoms: ['Shorts', 'Jogging pants'],
      },
    },
    female: {
      cold: {
        tops: ['Sweater', 'Jacket', 'Cozy sweater'],
        bottoms: ['Jeans', 'Jogging pants', 'Skirt', 'Leggings'],
      },
      moderate: {
        tops: ['T-shirt', 'Shirt', 'Blouse', 'Sweater', 'Jacket'],
        bottoms: ['Jeans', 'Shorts', 'Jogging pants', 'Skirt', 'Leggings'],
      },
      hot: {
        tops: ['T-shirt', 'Shirt', 'Blouse'],
        bottoms: ['Shorts', 'Jogging pants', 'Skirt', 'Leggings'],
      },
    },
  },
  'semi-formal': {
    male: {
      cold: {
        tops: ['Sweater', 'Jacket'],
        bottoms: ['Jeans', 'Chinos'],
      },
      moderate: {
        tops: ['Shirt', 'Polo shirt', 'Sweater', 'Jacket', 'Blazer'],
        bottoms: ['Jeans', 'Chinos', 'Dress pants'],
      },
      hot: {
        tops: ['Shirt', 'Polo shirt', 'Jacket', 'Blazer'],
        bottoms: ['Chinos', 'Dress pants'],
      },
    },
    female: {
      cold: {
        tops: ['Sweater', 'Jacket'],
        bottoms: ['Jeans', 'Skirt', 'Dress pants'],
      },
      moderate: {
        tops: ['Blouse', 'Sweater', 'Jacket', 'Blazer'],
        bottoms: ['Jeans', 'Skirt', 'Dress pants'],
      },
      hot: {
        tops: ['Blouse', 'Jacket', 'Blazer'],
        bottoms: ['Skirt', 'Dress pants'],
      },
    },
  },
  formal: {
    male: {
      cold: {
        tops: ['Suit', 'Blazer'],
        bottoms: ['Dress pants', 'Suit pants'],
      },
      moderate: {
        tops: ['Dress shirt', 'Suit', 'Blazer'],
        bottoms: ['Dress pants', 'Suit pants'],
      },
      hot: {
        tops: ['Dress shirt', 'Suit'],
        bottoms: ['Dress pants'],
      },
    },
    female: {
      cold: {
        tops: ['Dress', 'Blazer'],
        bottoms: ['Skirt', 'Dress pants'],
      },
      moderate: {
        tops: ['Blouse', 'Dress', 'Blazer'],
        bottoms: ['Skirt', 'Dress pants'],
      },
      hot: {
        tops: ['Blouse', 'Dress'],
        bottoms: ['Skirt', 'Dress pants'],
      },
    },
  },
  comfort: {
    male: {
      cold: {
        tops: ['Hoodie', 'Sweatshirt'],
        bottoms: ['Comfortable joggers', 'Sweatpants'],
      },
      moderate: {
        tops: ['Hoodie', 'Sweatshirt', 'Loose-fit shirt'],
        bottoms: ['Comfortable joggers', 'Sweatpants'],
      },
      hot: {
        tops: ['T-shirt', 'Shirt'],
        bottoms: ['Shorts', 'Jogging pants'],
      },
    },
    female: {
      cold: {
        tops: ['Cozy sweater', 'Oversized shirt'],
        bottoms: ['Leggings', 'Sweatpants'],
      },
      moderate: {
        tops: ['Cozy sweater', 'Oversized shirt'],
        bottoms: ['Leggings', 'Sweatpants'],
      },
      hot: {
        tops: ['T-shirt', 'Shirt'],
        bottoms: ['Shorts', 'Leggings', 'Skirt'],
      },
    },
  },
};

let currentLanguage = 'es';

async function getWeather() {
  const apiKey = '88f8c28b2b20ec97e7b18f4451757530';
  const city = document.getElementById('cityInput').value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();
    const weatherConditions = getWeatherConditions(weatherData);
    const clothingSuggestion = suggestClothing(weatherData);
    document.getElementById('weatherConditions').textContent = weatherConditions;
    document.getElementById('clothingSuggestion').textContent = clothingSuggestion;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function getWeatherConditions(weatherData) {
  const currentConditions = weatherData.list[0].weather[0].description;
  const currentTemperature = weatherData.list[0].main.temp;
  const cloudiness = weatherData.list[0].clouds.all;
  const humidity = weatherData.list[0].main.humidity;
  const tempMin = weatherData.list[0].main.temp_min;
  const tempMax = weatherData.list[0].main.temp_max;
  const temperatureRange = `${tempMin}°C - ${tempMax}°C`;

  return `${languageData[currentLanguage].currentWeatherConditions}: ${currentConditions}\n`
       + `${languageData[currentLanguage].currentTemperature}: ${currentTemperature}°C\n`
       + `${languageData[currentLanguage].cloudiness}: ${cloudiness}%\n`
       + `${languageData[currentLanguage].humidity}: ${humidity}%\n`
       + `${languageData[currentLanguage].temperatureRange}: ${temperatureRange}`;
}

function suggestClothing(weatherData) {
  const formality = document.getElementById('formalitySelect').value;
  const gender = document.getElementById('genderSelect').value;
  const currentConditions = weatherData.list[0].weather[0].description;
  const currentTemperature = weatherData.list[0].main.temp;

  let temperatureCategory = '';
  if (currentTemperature > 25 ) {
    temperatureCategory = 'hot'; 
  } else if (currentTemperature > 15) {
    temperatureCategory = 'moderate';
  } else {
    temperatureCategory = 'cold';
  }

  const topsToConsider = [...clothingOptions[formality][gender][temperatureCategory].tops];
  const bottomsToConsider = [...clothingOptions[formality][gender][temperatureCategory].bottoms];

  const topSuggestion = getRandomItem(topsToConsider);
  const bottomSuggestion = getRandomItem(bottomsToConsider);

  return `${languageData[currentLanguage].suggestionIntro} ${topSuggestion} and 
          ${bottomSuggestion} ${languageData[currentLanguage].suggestionOutro}.\n`;
}

function getRandomItem(items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
