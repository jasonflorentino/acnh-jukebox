export function makeIdFromSongName(name: string) {
  return name.replace(/[^a-zA-Z]/g, '');
}

export default makeIdFromSongName;