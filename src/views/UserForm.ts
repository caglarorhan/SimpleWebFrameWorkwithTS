import { User, UserProps } from "../models/User";
import {View} from "./View";

export class UserForm extends View<User, UserProps>{

    eventsMap():{[key:string]: ()=>void}{

        return {
            'click:button.set-age': this.onSetAgeClick,
            'click:#set-name': this.onSetNameClick,
            'click:#save-model': this.onSaveClick
        }
    }

onSaveClick = ():void=>{
        this.model.save();
}


onSetNameClick=():void=>{
    const input = this.parent.querySelector('#new-name');
    if(input){
        const name = input.value;
        this.model.set({name: name})
    }
}


onSetAgeClick=():void=>{
    this.model.setRandomAge();
}


    template():string{
        return `
        <div>
            <input id="new-name" placeholder="${this.model.get('name')}"/> <button id="set-name">Change Name</button>
            <button class="set-age">Set Random Age</button>
            <button id="save-model">Save User</button>
        </div>    
        `;
    }

}
