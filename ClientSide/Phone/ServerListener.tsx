

let wssUrl = "wss://user49056293-lfe3vbfk.wormhole.vk-apps.com/";

class ServerListenerClass{
	ws: WebSocket;
	connect() {
		this.ws = new WebSocket(wssUrl);
		this.ws.onopen = (e) => {
			this.ws.send(this.createAnswer('connect', { role: 'controller' }))
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
	sendPos(type, x, y, z) {
		this.ws.send(this.createAnswer(type, { x: x, y: y, z: z }));
	}
}

let ServerListener = new ServerListenerClass;

export default ServerListener;