let out = "0";
let display = $(".display");

function update(temp) {
  out = String(temp);
  display.text(out);
}

$(".enter").click(() => {
  let calculated;
  
  try {
    calculated = eval(out);
  } catch (error) {
    calculated = "error";
  }

  update(calculated);
});

$(".ac").click(() => {
  update("0");
});

$(".c").click(() => {
  if (out.length >1) {
    update(out.slice(0, out.length-1));
  } else {
    update(0);
  }
});

$(".math").click((e) => {
  if (out == "0" || out == "error") {
    update(e.target.innerText);
  } else {
    update(out + e.target.innerText);
  }
});