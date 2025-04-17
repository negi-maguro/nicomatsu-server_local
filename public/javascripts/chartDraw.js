// /*------------------------------------------------------
// * アンケートのグラフ描画のためのJavascript
// * ----------------------------------------------------*/


// // 外で宣言しておかないとdestroyされなかった
// let myDoughnutChart;
// let myBarChart;


// /*------------------------------------------------------
// * ドーナツ型グラフの描画を行う
// * 引数1：描画先のcanvasのid
// * 引数2：描画データの配列[a,b,c,d,e]
// * 戻り値：なし
// *-----------------------------------------------------*/
// function doughnutChartDraw(drawCanvasId, chartList){
//   const ctx = document.getElementById(drawCanvasId);
//   // 割合で表示したいので計算する
//   const total = Number(chartList[0])+Number(chartList[1])+Number(chartList[2])+Number(chartList[3])+Number(chartList[4]);
//   const dataA = total==0 ? '' : chartList[0]/total;
//   const dataB = total==0 ? '' : chartList[1]/total;
//   const dataC = total==0 ? '' : chartList[2]/total;
//   const dataD = total==0 ? '' : chartList[3]/total;
//   const dataE = total==0 ? '' : chartList[4]/total;

//   // すでにインスタンス作成されていたら破棄
//   if(myDoughnutChart){
//     myDoughnutChart.destroy();
//   }

//   // ドーナツグラフ描画処理
//   myDoughnutChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: ["A", "B", "C", "D", "E"],
//       datasets: [{
//         backgroundColor: [
//             "#f48fb1",
//             "#5eacff",
//             "#ffff82",
//             "#68ff83",
//             "#8d1dff"
//         ],
//         data: [dataA, dataB, dataC, dataD, dataE]
//       }]
//     },
//     options: {
//       title: {
//         display: false,
//         text: 'アンケート結果'
//       },
//       responsive: true,
//       animation:{
//         animateRotate:false
//       },
//       tooltips:{
//         enabled:false
//       },
//       plugins: {
//         datalabels: {
//           color: '#000',
//           font: {
//             weight: 'bold',
//             size: 10,
//           },
//           // グラフ内に「選択肢：パーセント」表示をするための設定
//           formatter: function(value, ctx) {
//             return ctx.chart.data.labels[ctx.dataIndex] + ': ' + Math.round(value*100) + '%';
//           },
//         }
//       }
//     }
//   })
// };


// /*------------------------------------------------------
// * 棒グラフの描画を行う
// * 引数1：描画先のcanvasのid
// * 引数2：描画データの配列[a,b,c,d,e]
// * 戻り値：なし
// *-----------------------------------------------------*/
// function barChartDraw(drawCanvasId, chartList){
//   // すでにインスタンス作成されていたら破棄
//   if(myBarChart){
//     myBarChart.destroy();
//   }

//   // 棒グラフ描画処理
//   myBarChart = new Chart(document.getElementById(drawCanvasId), {
//     type: "bar",
//     data: {
//       title: ["アンケート結果"],
//       datasets: [
//         { label: "A", data: [chartList[0]], backgroundColor: "#f48fb1" },
//         { label: "B", data: [chartList[1]], backgroundColor: "#5eacff" },
//         { label: "C", data: [chartList[2]], backgroundColor: "#ffff82" },
//         { label: "D", data: [chartList[3]], backgroundColor: "#68ff83" },
//         { label: "E", data: [chartList[4]], backgroundColor: "#8d1dff" }
//       ]
//     },
//     options: {
//       animation:false,
//       tooltips:{
//         enabled:false
//       },
//       responsive: true,
//       legend: {
//         display: true
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             suggestedMax: 100,
//             suggestedMin: 0,
//             stepSize: 10,
//             }
//         }]
//       },
//       plugins: {
//         datalabels: {
//           color: '#000',
//           font: {
//             weight: 'bold',
//             size: 20,
//           },
//         }
//       }
//     }
//   })
// };
