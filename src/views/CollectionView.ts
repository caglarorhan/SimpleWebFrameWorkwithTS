import {Collection} from "../models/Collection";


export abstract class CollectionView<T,K>{
    constructor(public parent: Element, public collection: Collection<T,K>){}

    abstract renderItem(model:T, itemParent:Element):void;


    render():void{
        console.log(this.collection.models)
        this.parent.innerHTML='';
        const templateElement = document.createElement('template');

        for(let model of this.collection.models){
            console.log('a')
            const itemParent = document.createElement('div');
            this.renderItem(model, itemParent);
            templateElement.content.append(itemParent);

        }
        //console.log(templateElement.content);
        this.parent.append(templateElement.content);
    }


}
