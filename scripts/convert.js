const select = document.querySelector(".js-select");
const temp = document.querySelector(".temp");
const see = document.querySelector(".js-result");

function convertToTemp() {
  if (select.value === "℃") {
    let result = (temp.value * 9) / 5 + 32;

    see.innerHTML = `${Math.round(result)}℉`;
  } else if (select.value === "℉") {
    let result = ((temp.value - 32) * 5) / 9;
    see.innerHTML = `${Math.round(result)}℃`;
  } else if (!temp.value && select.value !== "℃" && select.value !== "℉") {
    see.innerHTML =
      '<p class="mistake">Error!</p> Pls Input Value and Temperature.';
    return;
  }

  select.value = "select one";
  temp.value = "";
}

const values = document.querySelector(".js-value");
const from = document.querySelector(".js-from");
const to = document.querySelector(".js-to");
const view = document.querySelector(".js-view");

function convertToL() {
  if (from.value !== "KM" && from.value !== "MILES" && from.value !== "FEET") {
    view.innerHTML = `invalid unit: ${from.value}`;
  }

  if (to.value !== "KM" && to.value !== "MILES" && to.value !== "FEET") {
    view.innerHTML = `invalid unit: ${to.value}`;
  }

  if (from.value === "KM") {
    if (to.value === "MILES") {
      const final = values.value / 1.6;
      view.innerHTML = `${Math.round(final)}miles`;
    } else if (to.value === "FEET") {
      const final = values.value * 3281;
      view.innerHTML = `${Math.round(final)}ft`;
    }
  } else if (from.value === "MILES") {
    if (to.value === "KM") {
      const final = values.value * 1.6;
      view.innerHTML = `${Math.round(final)}km`;
    } else if (to.value === "FEET") {
      const final = values.value * 5280;
      view.innerHTML = `${Math.round(final)}ft`;
    }
  } else if (from.value === "FEET") {
    if (to.value === "KM") {
      const final = values.value / 3281;
      view.innerHTML = `${Math.round(final)}km`;
    } else if (to.value === "MILES") {
      const final = values.value / 5280;
      view.innerHTML = `${Math.round(final)}miles`;
    }
  }
}
// function testin() {
//   if (testin.value === testin.value + "C") {
//     let result = (testin.value * 9) / (5 + 32);

//     console.log(`${Math.round(result)}℉`);
//   }
// }
