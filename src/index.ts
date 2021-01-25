// import 'core-js/stable';
// import 'regenerator-runtime/runtime'; 太占用空间，还是使用polyfill垫片
import "./index.less";
import { fromEvent, interval } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import axios from 'axios';
import  _ from 'lodash';


const listEle = document.getElementById('list');
const listEle$ = fromEvent(listEle, 'click').pipe(map((e: MouseEvent) => ({ clientX: e.clientX })));
const source$ = interval(1000);
source$
    .pipe(take(5))
    .subscribe(res => console.log(res));
listEle$.subscribe(res =>{
    console.log(res);
    axios.get('/api/userinfo').then(userinfo => console.log(userinfo.data));
    console.log('hot update')
}
     );
console.log('hhh')

class A{
    name:string;
    constructor(name: string){
        this.name = name;
    }
};

console.log(new A('kaven'));
_.assign({},{a:1});
