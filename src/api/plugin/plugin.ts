export class EnhonPlugin {
  broadcastChannal: BroadcastChannel;

  constructor(id: string){
    this.broadcastChannal = new BroadcastChannel(`Enhon.plugins.${id}`);
  }

  onload(callback: Function){
    this.broadcastChannal.onmessage = e => {
      if(e.data == 'load') callback();
    };
  }
};