let apikey = "xxx";

function save() {
    let data = document.getElementById("memo").value;

    let url = `https://db.monaca.education/v1/insert?apikey=${apikey}&text1=${data}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (results) {
            console.log(results);
            location.reload();
        })
}

function load() {
    let url = `https://db.monaca.education/v1/select?apikey=${apikey}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (results) {
            console.log(JSON.stringify(results));

            for (let i = 0; i < results.totalCount; i++) {
                console.log(`${i}番目${results.records[i].text1}`)

                let frame = document.createElement("div"); //一つ分の領域

                let contents = document.createElement("div");
                let date = document.createElement("div");
                let deleteButton = document.createElement("button");

                frame.className = "memo";

                let d = new Date(results.records[i].created * 1000);

                contents.innerText = `${results.records[i].text1}`;
                date.innerText = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
                deleteButton.innerText = "削除";

                let checkbox = document.createElement("input"); // まずinputタグを生成
                checkbox.type = "checkbox"; // typeをcheckboxしてチェックボックスにする
                // onchangeイベントを定義

                if (results.records[i].int1 == 0 || results.records[i].int1 == null) {
                    checkbox.checked = false;
                } else {
                    checkbox.checked = true;
                }

                frame.appendChild(checkbox);

                frame.appendChild(contents);
                frame.appendChild(date);
                frame.appendChild(deleteButton);



                let display = document.getElementById("display");
                display.appendChild(frame);

                deleteButton.onclick = () => {
                    let url = `https://db.monaca.education/v1/delete?apikey=${apikey}&OIDIn=${results.records[i].OID}`;
                    console.log("よばれた");
                    fetch(url)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (result) {
                            console.log(result);
                            location.reload(); // 再読み込みさせて画面を更新する
                        });
                };

                checkbox.onchange = (event) => {
                    console.log(event.target.checked);

                    let jud;

                    if (event.target.checked == true) {
                        jud = 1;
                    } else {
                        jud = 0;
                    }

                    console.log(jud);

                    let url = `https://db.monaca.education/v1/update?apikey=${apikey}&OIDIn=${results.records[i].OID}&int1=${jud}`;
                    fetch(url)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (results) {
                            console.log(results);
                            location.reload();
                        })
                }
            }
        });
}

