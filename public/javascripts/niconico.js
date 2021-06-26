/*------------------------------------------------------
* コメント・スタンプを表示するためのJavascript
*-----------------------------------------------------*/

/*------------------------------------------------------
* ランダムな配置にするために0〜1の乱数をかける
* 引数：元の値
* 戻り値：引数に乱数を乗算した値
*-----------------------------------------------------*/
function rand (value) {
  return Math.floor(value * Math.random());
};


/*------------------------------------------------------
* コメントを弾幕で画面描画する処理
* 引数：GETリクエストされたクエリパラメタをオブジェクトにしたもの
* 戻り値：なし
*-----------------------------------------------------*/
function handleComment (msg) {
  // コメントと縁取りの色を設定
  const color = msg.color || '#000000' ;
  const shadow = msg.shadow || '#808080' ;

  // コメント文字のサイズを設定
  const size = msg.size;

  // コメントと名前の表示要素を作成
  const commentText = document.createElement('div');
  const commentName = document.createElement('span');

  // コメントのスタイル設定
  commentText.style.position = 'fixed';
  commentText.style.left = window.innerWidth + 'px';
  commentText.style.top = rand(window.innerHeight - 40) + 'px';
  commentText.style.fontSize = size + 'pt';
  commentText.style.fontWeight = 'bold';
  commentText.style.color = color;
  commentText.style.textShadow = `-1.5px -1.5px 0px ${shadow}, -1.5px 1.5px 0px ${shadow},
                                1.5px -1.5px 0px ${shadow}, 1.5px 1.5px 0px ${shadow}`;
  commentText.style.whiteSpace = 'pre';
  commentText.style.zIndex = 2147483647;

  // 虹色の場合はrainbowtxtクラスのスタイルを適用
  if (color == 'Rainbow'){
    commentText.classList.add('rainbowtext')
  }

  // 名前部分のスタイル設定（サイズと文字色を固定）
  commentName.style.fontSize = 20 + 'pt';
  commentName.style.color = 'black';
  commentName.style.textShadow = `-1.5px -1.5px 0px ${shadow}, -1.5px 1.5px 0px ${shadow},
                               1.5px -1.5px 0px ${shadow}, 1.5px 1.5px 0px ${shadow}`;

  // コメントと名前の入力内容を表示文字として設定
  commentText.innerText = msg.body;
  commentName.innerText = msg.nickname;

  // 名前のspan要素をコメントのdiv要素に追加
  commentText.appendChild(commentName);

  // コメントのdiv要素をbodyに追加
  document.body.appendChild(commentText);

 // 弾幕風に流すための効果を設定
  const effect = [{
    left: window.innerWidth + 'px'
  },{
    left: -commentText.offsetWidth * 1.2 + 'px'
  }];

  // コメントの流れていく速さなどを設定
  const timing = {};
  // レンジスライダー(2000〜5000)で値の大きな右を速い方にしたかったので7000から引き算する
  timing.duration = (7000 - msg.duration || 2000) * (window.innerWidth + commentText.offsetWidth) / window.innerWidth;
  // アニメーションの繰り返し回数
  timing.iterations = 1;
  // アニメーションの速さは変えない
  timing.easing = 'linear';

  // 表示の高さをランダムにする
  commentText.style.top = rand(window.innerHeight - commentText.offsetHeight) + 'px';

  // アニメーションで動かし終わったらbodyに追加した要素を削除
  commentText.animate(effect, timing).onfinish = function () {
    document.body.removeChild(commentText)
  };
};


/*------------------------------------------------------
* スタンプをランダムで画面描画する処理
* 引数：GETリクエストされたクエリパラメタをオブジェクトにしたもの
* 戻り値：なし
*-----------------------------------------------------*/
function handleLike (msg) {
  // スタンプの情報（ファイル名）を設定
  const image = msg.image;
  const url = `/public/images/${image}.png`;

  // スタンプのimg要素を作成
  const stamp = document.createElement('img');

  // スタンプ要素が読み込まれたら表示位置アニメーションを設定する
  stamp.addEventListener('load', function (e) {
    stamp.style.position = 'fixed';
    stamp.style.left = rand(window.innerWidth) - stamp.width / 2 + 'px';
    stamp.style.top = rand(window.innerHeight) - stamp.height / 2 + 'px';
    stamp.style.zIndex = 2147483647;
    stamp.style.opacity = 0.0;

    // スタンプのimg要素をbodyに追加
    document.body.appendChild(stamp);

    // スタンプがだんだん大きくなって透明からくっきりして薄くなって終わる設定
    const effect = [{
        opacity: 0.0,
        transform: 'scale(0.0, 0.0) translate(0, 20px)'
      },{
        opacity: 1.0,
        transform: 'scale(0.7, 0.7) translate(0, 0px)'
      },{
        opacity: 0.7,
        transform: 'scale(1.0, 1.0) translate(0, -50px)'
      }
    ];

    // スタンプを表示しておく速さなどを設定
    const timing = {};
    // スタンプの表示速度 値が大きいほど遅い（何msec画面に表示させるか）
    timing.duration = 1500;
    // アニメーションの繰り返し回数
    timing.iterations = 1;
    // アニメーション速度の上げ方（最初が速くて最後遅い）
    timing.easing = 'ease-in';

    // アニメーションで動かし終わったらbodyに追加した要素を削除
    stamp.animate(effect, timing).onfinish = function () {
      document.body.removeChild(stamp);
    };
  });
  stamp.src = url;
};
