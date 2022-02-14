// Loading jQuery
async function loadJquery() {
  let script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  document.getElementsByTagName("head")[0].appendChild(script);

  //Checks that jQuery has been successfully loaded
  while (
    typeof window.jQuery === undefined ||
    typeof window.$ === undefined ||
    typeof $.ajax !== "function"
  ) {
    await sleep(1000);
  }
}

// Sleep function per second if jQuery is not loaded
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await loadJquery();
// Import CSS file
const addCSS = () => {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";
  document.head.appendChild(link);
};

addCSS();

// Build the tooltip with content
const createTooltip = (content, id) => {
  let html = `<div class="sttip" id="x_${id}" style="position:absolute;">

         <div class="tooltip in">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-arrow second-arrow"></div>
          <div class="popover-inner"  style="background-color:#D3E4CD; padding: 24px; font-size: 20px;">
          <button type='button' class='close' onclick='$(this).parent().hide();'>X</button>
           ${content}
              </div>
        </div>
    </div>`;
  return html;
};

// JSONP URL
const url =
  "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";

function getData() {
  $.ajax({
    url: url,
    dataType: "JSONP",
    success: (data) => {
      const jsonData = data.data.structure.steps;
      jsonData.forEach((step) => {
        if (JSON.stringify(step.action.contents) === undefined) {
          return;
        }
        let content = JSON.stringify(step.action.contents)
          .split(":")[1]
          .slice(0, -4)
          .slice(1);
        // Take the content and built HTML template for it.
        const html = createTooltip(content, step.id)
        let selector = step.action.selector
        const div = document.createElement("div");
        div.innerHTML = html;
        const body = document.body;
        body.append(div);
       //using properties CSS before to position in page
        if (content.includes("Welcome")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 1000,
            top: 155,
          });
        }

        if (content.includes("Images")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 330,
            top: 60,
          });
        }

        if (content.includes("ENTER")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 520,
            top: 345,
          });
        }

        if (content.includes("to search")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 1320,
            top: 440,
          });
        }
      });
    },
  });
}

getData();
