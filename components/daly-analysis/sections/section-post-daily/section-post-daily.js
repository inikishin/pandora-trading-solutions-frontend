import { Typography } from "@material-ui/core";
import Chart from 'react-apexcharts';
import { generateDailyAnalysisText } from "../../../../utils/daily-analysis/daily-analysis";

const chartOptions = {
  chart: {
    id: 'basic-candlestick',
  },
  xaxis: {
    title: {
      text: 'Дата'
    },
  },
  yaxis: {
    title: {
      text: 'Цена'
    },
    labels: {
      formatter: function(value) {
        return value.toFixed(2);
      }
    }
  },
  legend: {
    position: 'top'
  },
};

function SectionPostDaily({ data, featureCodes }) {
  console.log(data);
  console.log(featureCodes);

  const resultArray = [];

  data.features.forEach((item) => {
    resultArray.push([item.datetime, item.open, item.high, item.low, item.close, ...item.features]);
  });

  console.log(resultArray);

  const chartSeries = [
    {
      type: 'candlestick',
      name: 'chart',
      data: resultArray.map((item) => (
        {x: new Date(item[0]).toLocaleDateString(), y: item.slice(1, 5)}
      ))
    },
    {
      type: 'line',
      name: 'ma8',
      data: resultArray.map((item) => (
        {x: new Date(item[0]).toLocaleDateString(), y: item[5]}
      )),
    },
    {
      type: 'line',
      name: 'ma13',
      data: resultArray.map((item) => (
        {x: new Date(item[0]).toLocaleDateString(), y: item[7]}
      )),
    },
  ];

  if (featureCodes && data.features) {
    return <>Loading...</>
  }

  const generatedText = generateDailyAnalysisText(featureCodes.featureCodes, data.features.slice(-1));

  return (
    <>
      <Typography variant="h4">Анализ дневного графика</Typography>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="candlestick"
      />
      <Typography>
        {generatedText}
      </Typography>
      <Typography>Линия тренда, построенная за последние 8 дней, направлена вверх. Угол ее наклона составляет 62.5
        градусов. Линия тренда, построенная за последние 35 дней, направлена вниз. Угол ее наклона составляет -1.9
        градусов. Цена находится выше быстрой скользящей средней. Быстрое скользящее среднее, в свою очередь, находится
        выше медленной скользящей средней. Все это указывает на то, что сейчас на рынке наблюдается восходящий тренд.
      </Typography>
      <Typography>Индикатор MACD находится выше нулевой линии, его значения повышаются. Значение индикатора %Williams
        равно -9.0. Он находится в зоне перекупленности. Также присутствует краткосрочное медвежье расхождение между
        ценой и индикатором %Williams. Что может говорить о скором появлении нисходящего движения цены. Значение
        индикатора CCI равно 74.0. Он не находится на текущий момент в экстремальных зонах. Также присутствует
        краткосрочное медвежье расхождение между ценой и индикатором CCI. Что может говорить о скором появлении
        нисходящего движения цены.
      </Typography>
    </>
  )
}

export default SectionPostDaily;
