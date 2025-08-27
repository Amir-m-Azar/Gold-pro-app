let iranHistory = [];

async function fetchIranGold() {
  try {
    // منبع 1: TGJU
    const res1 = await fetch('https://api.tgju.online/v1/market/price/gold_18');
    const data1 = await res1.json();
    const price1 = parseInt(data1.data.p.replace(/,/g,''));

    // منبع 2: Milli
    const res2 = await fetch('https://api.milli.ir/gold18'); // فرضی/API رسمی
    const data2 = await res2.json();
    const price2 = parseInt(data2.price.replace(/,/g,''));

    const prices = [price1, price2];
    const finalPrice = prices.sort((a,b) => Math.abs(a - prices.reduce((x,y)=>x+y,0)/prices.length))[0];

    document.getElementById('iranGold').innerText = finalPrice + ' تومان';
    iranHistory.push(finalPrice);
    if (iranHistory.length > 3600) iranHistory.shift();
  } catch(e) { console.log('خطا در دریافت طلای ایران', e); }
}

// توابع مشابه برای fetchWorldGold، fetchSekehBubble، تحلیل، پیش‌بینی و نمودار روند
// الگوریتم حد ضرر/حد سود دینامیک و تحلیل رنگی

async function updateAll() {
  await fetchIranGold();
  // فراخوانی توابع دیگر: fetchWorldGold, fetchSekehBubble, analyze, predict, updateChart
}

setInterval(updateAll, 1000);
updateAll();
