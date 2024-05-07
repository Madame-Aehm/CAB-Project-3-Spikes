type Zodiac = "Aquarius" | "Pisces" | "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn"

export interface User {
  username: string
  star_sign: Zodiac
}