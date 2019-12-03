import { User } from "../models/User";


export class UserForm{
    constructor(public parent:Element, public model: User){
        this.bindModel();
    }

    eventsMap():{[key:string]: ()=>void}{
        return {
            'mouseover:h1': this.onHeaderHover,
            'click:button.set-age': this.onSetAgeClick,
            'click:#set-name': this.onSetNameClick
        }
    }

onSetNameClick=():void=>{
    const input = this.parent.querySelector('#new-name');
    if(input){
         const name = input.value;
        this.model.set({name: name})
    }
   
}

bindModel():void{
    this.model.on('change',()=>{this.render()})
}

  

onSetAgeClick=():void=>{
    this.model.setRandomAge();
    console.log('Random age assigned');
}

onHeaderHover(): void{
    console.log('h1 was hovered');
}


    template():string{
        return `
        <div>
            <h1>User Form</h1>
            <div>User name:${this.model.get('name')}</div>
            <div>User age:${this.model.get('age')}</div>
            <input id="new-name"/> <button id="set-name">Change Name</button>
            <button class="set-age">Set Random Age</button>
            <button id="aButton">A Button</button>
        </div>    
        `;
    }

    bindEvents(fragment: DocumentFragment):void{
        console.log('Bind baslamaliydi...')
        const eventsMap = this.eventsMap();
        console.log(eventsMap)
        for(let eventKey in eventsMap){ // all keys in objects (ex: click:button // is the first key)
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                console.log(`${selector} elementine ${eventName} baglandi`);
                element.addEventListener(eventName,eventsMap[eventKey]);
            });
        }
    }

    render(): void{
        this.parent.innerHTML='';
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.parent.append(templateElement.content);
    }
}