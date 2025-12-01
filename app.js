// Yugoslav Meteorological Bureau - Weather Display
// Fetches today's forecast from Supabase and renders retro interface

// Initialize Supabase client (uses anon key for public read access)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://fuolifxojezvplkquniy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1b2xpZnhvamV6dnBsa3F1bml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3ODcyODcsImV4cCI6MjA3NjM2MzI4N30.TK4kh8BCX2kP2xORrhzp531lgVrybd0wV-7v8HpNLS8'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Rotate analog gauge needle based on value
// tempRange: -10 to 30°C maps to -90deg to +90deg
function setGaugeNeedle(needleId, value, minValue, maxValue) {
  const needle = document.getElementById(needleId)
  if (!needle) return

  // Map value to angle (-90deg to +90deg)
  const range = maxValue - minValue
  const normalizedValue = (value - minValue) / range
  const angle = (normalizedValue * 180) - 90 // -90 to +90

  needle.style.transform = `rotate(${angle}deg)`
}

// Fetch and display today's forecast
async function loadForecast() {
  const loading = document.getElementById('loading')
  const error = document.getElementById('error')
  const content = document.getElementById('content')

  try {
    console.log('Starting forecast load...')
    const today = getTodayDate()
    console.log('Today date:', today)

    // Fetch today's forecast from Supabase
    console.log('Fetching from Supabase...')
    const { data, error: fetchError } = await supabase
      .from('weather_forecasts')
      .select('*')
      .eq('forecast_date', today)
      .single()

    console.log('Supabase response:', { data, fetchError })

    if (fetchError) {
      throw new Error(fetchError.message)
    }

    if (!data) {
      throw new Error('No forecast available for today')
    }

    // Hide loading, show content
    console.log('Hiding loading, showing content...')
    loading.style.display = 'none'
    content.style.display = 'block'

    // Render forecast
    console.log('Rendering forecast...')
    renderForecast(data)
    console.log('Forecast rendered successfully!')

  } catch (err) {
    console.error('Error loading forecast:', err)
    console.error('Error stack:', err.stack)
    loading.style.display = 'none'
    error.style.display = 'block'
    error.querySelector('p').textContent = `Error: ${err.message}`
  }
}

// Render forecast data on the page
function renderForecast(forecast) {
  // Date stamp
  document.getElementById('forecast-date').textContent = formatDate(forecast.forecast_date)

  // Yugoslav commentary (long summary)
  document.getElementById('commentary').textContent = forecast.ai_long_summary

  // Morning
  document.getElementById('morning-temp').textContent = Math.round(forecast.morning_temp)
  document.getElementById('morning-desc').textContent = forecast.morning_description

  if (forecast.morning_rain > 0) {
    document.getElementById('morning-rain').textContent = `${Math.round(forecast.morning_rain)}mm`
    document.getElementById('morning-rain').classList.remove('no-rain')
    document.getElementById('morning-rain').style.display = 'block'
  } else {
    document.getElementById('morning-rain').textContent = 'Dry'
    document.getElementById('morning-rain').classList.add('no-rain')
    document.getElementById('morning-rain').style.display = 'block'
  }

  // Afternoon
  document.getElementById('afternoon-temp').textContent = Math.round(forecast.afternoon_temp)
  document.getElementById('afternoon-desc').textContent = forecast.afternoon_description

  if (forecast.afternoon_rain > 0) {
    document.getElementById('afternoon-rain').textContent = `${Math.round(forecast.afternoon_rain)}mm`
    document.getElementById('afternoon-rain').classList.remove('no-rain')
    document.getElementById('afternoon-rain').style.display = 'block'
  } else {
    document.getElementById('afternoon-rain').textContent = 'Dry'
    document.getElementById('afternoon-rain').classList.add('no-rain')
    document.getElementById('afternoon-rain').style.display = 'block'
  }

  // Evening
  document.getElementById('evening-temp').textContent = Math.round(forecast.evening_temp)
  document.getElementById('evening-desc').textContent = forecast.evening_description

  if (forecast.evening_rain > 0) {
    document.getElementById('evening-rain').textContent = `${Math.round(forecast.evening_rain)}mm`
    document.getElementById('evening-rain').classList.remove('no-rain')
    document.getElementById('evening-rain').style.display = 'block'
  } else {
    document.getElementById('evening-rain').textContent = 'Dry'
    document.getElementById('evening-rain').classList.add('no-rain')
    document.getElementById('evening-rain').style.display = 'block'
  }

  // Daily average temperature for the single gauge
  const avgTemp = (forecast.morning_temp + forecast.afternoon_temp + forecast.evening_temp) / 3
  document.getElementById('avg-temp').textContent = Math.round(avgTemp)
  setGaugeNeedle('temp-needle', avgTemp, -10, 30)

  // Wind
  document.getElementById('wind').textContent = Math.round(forecast.wind)
  setGaugeNeedle('wind-needle', forecast.wind, 0, 50)

  // Sunrise/Sunset
  document.getElementById('sunrise').textContent = forecast.sunrise
  document.getElementById('sunset').textContent = forecast.sunset

  // Temperature range
  document.getElementById('high-temp').textContent = Math.round(forecast.high_temp)
  document.getElementById('low-temp').textContent = Math.round(forecast.low_temp)
}

// Load forecast when page loads
loadForecast()
