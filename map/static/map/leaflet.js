//地図オブジェクトを入れる変数mapは別でも使うのでグローバル変数にする。
let map;
function init(){
    //zoomControl:falseで左上拡大縮小ボタンの消去
    let map = L.map('mapcontainer', { zoomControl: false });
    //緯度経度、拡大を決める
    map.setView([35.40, 136], 5)
    //利用する地図のデータのURLを設定。使いようではいくつかのマップをユーザーが行き来できるように設定できる。
    L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png', {
        attrinution: "<a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a>"
    }).addTo(map);

    {% for post in posts %}
    //ポップアップする文字や画像、htmlを設定
        let sucontents = "{{ post.overview }}"
    //ポップアップオブジェクトを作成 引数に幅を設定でき、それにオブジェクトをsetContentする
        let popup1 = L.popup({ maxWidth: 550 }).setContent(sucontents);
    //座標の指定
        const mpoint = [{{ post.latitude }}, {{ post.longitude }}];
    //埼玉大学の位置にマーカーを地図に追加, draggable:trueにするとカーソルを移動可能にできる。
    //座標の後にbindPopup()で引数にポップアップオブジェクトを設定し、それに.bindTooltipでカーソルオンしたときに表示されるチップを設定する
        L.marker(mpoint,/*{draggable:true}*/).bindPopup(popup1).bindTooltip("{{ post.name }}").addTo(map);
    //もちろん直接座標を入れることもできる
    // L.marker([35.8561, 139.6098],{title:"桜区役所"}).bindPopup(popup2).bindTooltip("桜区役所").addTo(map);
    {% endfor %}

}

//クリックしたトロにピンを置いたり、それをクリックして削除したり、円を書いたり戦を書いたりもできる。
//ピンの見た目も変えられるので、違う人が追加したときに見分け着くようにすることもできる。
// init();