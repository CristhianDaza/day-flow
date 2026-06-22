export function readCollection(key, fallback = []) {
  try {
    const rawValue = localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallback
  } catch (error) {
    console.warn(`No se pudo leer ${key} desde localStorage`, error)
    return fallback
  }
}

export function writeCollection(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
