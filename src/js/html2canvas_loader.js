'use strict'

const instanceSym = Symbol('instance');

export default class H2CLoader {
  static get instance(){
    return H2CLoader[instanceSym] || (H2CLoader[instanceSym] = new H2CLoader());
  }

  constructor(){
    if(H2CLoader[instanceSym]) throw "H2CLoader is already defined!";
    H2CLoader[instanceSym] = this;
    this.loaded = false;
  }
    
  load(path){
    if(this.loaded) return Promise.resolve();
    if(this._promise) return this._promise;

    this._promise = new Promise(
      (resolve, reject) => {
        let node = document.createElement('script');
        node.setAttribute('type', 'text/javascript');
        node.src = path;

        let flag = false;

        node.onload = node.onreadystatechange = function(){
          if(!flag || (!this.readyState || (this.readyState === 'complete'))){
            flag = true;
            resolve();
          }
        }

        node.onerror = reject;

        document.body.appendChild(node);
      }
    );

    return this._promise;
  }
}
