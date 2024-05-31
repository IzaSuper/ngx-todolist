import {Pipe, PipeTransform} from "@angular/core";
import {Item} from "../app/interface/item";

@Pipe({
  standalone: true,
  name: 'filterByData'
})
export class filterByDataPipe implements PipeTransform {

  transform(items: Item[], searchText: Map<keyof Item, Item[keyof Item]>): Item[] {
    console.log(searchText)
    return items.filter(item => {
      for (let [key, value] of searchText) {
        switch (key) {
          case 'completed':
            if (value !== 'all') {
              if (item[key].toString() !== value) {
                return false;
              }
            }
            break;
          case 'title':
          case 'description':
            const lowerCaseValue = value.toString().toLowerCase()
            if (lowerCaseValue !== '' && !item[key]?.toString().toLowerCase().includes(lowerCaseValue)) {
              return false;
            }
            break;
          default:
            console.log('Unrecognized type')
            break;
        }
      }
      return true;
    });
  }
}
