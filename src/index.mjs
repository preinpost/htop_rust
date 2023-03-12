import {h, render} from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

let i = 0;

const html = htm.bind(h);

function App (props) {
  return html`
    <div>
      ${props.cpus.map((cpu) => {
        return html`
          <div class="bar">
            <div class="bar-inner" style="width: ${cpu}%"></div>
            <label>${cpu.toFixed(2)}%</label>
          </div>
          
        `;
      })}
    </div>
  `;
}


// setInterval(async () => {
//   let response = await fetch('/api/cpus');
//   if (response.status !== 200) {
//     throw new Error(`HTTp error! status: ${response.status}`);
//   }
//
//   let json = await response.json();
//
//   render(html`<${App} cpus=${json} />`, document.body);
//
// }, 1000);

let url = new URL("/realtime/cpus", window.location.href);
url.protocol = url.protocol.replace("http", "ws");

let ws = new WebSocket(url.href);
ws.onmessage = (ev) => {
  render(html`<${App} cpus=${JSON.parse(ev.data)} />`, document.body);
  // console.log(JSON.parse(ev.data));
}