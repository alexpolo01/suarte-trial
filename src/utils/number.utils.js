/** NUMBER HAS TO BE INTEGER. IF IT'S DECIMAL, IT WON'T WORK */
const numberWithCommas =  (x) =>{ 
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const numberWithDots =  (x) =>{ 
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function numberParserMillionThousand(number) {
  const K_VALUE = 1000;
  const M_VALUE = 1000000;
  const K_THRESHOLD = 10000;
  const K_THRESHOLD_ROUND = 100000;
  const M_THRESHOLD = 1000000;
  const M_THRESHOLD_ROUND = 100000000;
  const B_THRESHOLD = 1000000000;
  const B_THRESHOLD_ROUND = 100000000000;
  const T_THRESHOLD = 1000000000000;
  const T_THRESHOLD_ROUND = 100000000000000;
  
  if(number < K_THRESHOLD) {
    return `${number}`;
  } else if(number >= K_THRESHOLD && number < K_THRESHOLD_ROUND) {
    return `${parseFloat((number / K_VALUE).toFixed(1))}K`;
  } else if(number >= K_THRESHOLD_ROUND && number < M_THRESHOLD) {
    return `${(number / K_VALUE).toFixed(0)}K`;
  } else if(number >= M_THRESHOLD && number < M_THRESHOLD_ROUND) {
    return `${parseFloat((number / M_VALUE).toFixed(1))}M`;
  } else if(number >= M_THRESHOLD_ROUND && number < B_THRESHOLD) {
    return `${(number / M_VALUE).toFixed(0)}M`;
  } else if(number >= B_THRESHOLD && number < B_THRESHOLD_ROUND) {
    return `${parseFloat((number / B_THRESHOLD).toFixed(1))}B`;
  } else if(number >= B_THRESHOLD_ROUND && number < T_THRESHOLD) {
    return `${(number / B_THRESHOLD).toFixed(0)}B`;
  } else if(number >= T_THRESHOLD && number < T_THRESHOLD_ROUND) {
    return `${parseFloat((number / T_THRESHOLD).toFixed(1))}T`;
  } else if(number >= T_THRESHOLD_ROUND) {
    return `${(number / T_THRESHOLD).toFixed(0)}T`;
  } else {
    return "";
  }
}

const timeParserMMSS = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

function getArtworkPrice(price, currency) {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  if(currency === 'EUR') return `${numberWithDots(price)}${currencySymbol}`;
  return `${currencySymbol}${numberWithCommas(price)}`;
}

const NumberUtils = {
  numberWithCommas,
  numberWithDots,
  numberParserMillionThousand,
  timeParserMMSS,
  getArtworkPrice
};

export default NumberUtils;