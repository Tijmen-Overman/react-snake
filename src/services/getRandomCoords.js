// @flow

const getRandomCoords = () => {
  const x = Math.floor(Math.random() * 24)
  const y = Math.floor(Math.random() * 24)

  return { x: x, y: y }
}

export default getRandomCoords
