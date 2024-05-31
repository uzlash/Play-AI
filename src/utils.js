
export function formatNumberWithCommas(number) {
    return number.toLocaleString('en-US');
}


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  
  const millionUnits = [
    '',
    'million',
    'billion',
    'trillion',
    'quatrillion'
  ]
  
  export function parsePoints(points) {
    let value = points
    let million = 0
    if (value > 1000000) {
      value /= 1000000
      million += 1
      while (value / 1000 > 1) {
        value /= 1000
        million += 1
      }
    }
  
    return {
      value: formatter.format(value),
      units: millionUnits[million]
    }
  }
  