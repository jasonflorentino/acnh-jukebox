type RestartTimes = {
  [key: string]: number;
}

/**
 * Restart times are given in seconds.
 */
const restartTimes: RestartTimes = {
  // Use for unknown restart time
  '0': -1,
  // AnimalCity
  '3': 44.95,
  // KKDisco
  '30': 40.55,
  // KKMoody
  '52': 68.45,
  // MaringSong2001
  '77': 214.15,
  // SpringBlossoms
  '87': 34.15,
}

export default restartTimes;