const violenceTexts = [
  'sex',
  'porn',
  'fuck',
]

const match = (text = '') => {
  return violenceTexts.some((item) => {
    return text.toLowerCase().includes(item);
  })
}

module.exports = {
  match
}
