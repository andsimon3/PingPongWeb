

let wssUrl = "wss://user49056293-lfe3vbfk.wormhole.vk-apps.com/";

class ServerListenerClass{
	ws: WebSocket;
	connect() {
		this.ws = new WebSocket(wssUrl);
		this.ws.onopen = (e) => {
			this.ws.send(this.createAnswer('connect', { role: 'host' }))
			this.ws.onclose = (e) => {
				alert('Disconnected');
			}
		}
	}
	createAnswer(type, data) {
		let answer = {
			type: type,
			data: data
		}
		return JSON.stringify(answer);
	}
}

let ServerListener = new ServerListenerClass;

export default ServerListener;