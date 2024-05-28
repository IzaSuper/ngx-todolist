import {Pipe, PipeTransform} from "@angular/core";
import {Item} from "../app/interface/item";

@Pipe({
  standalone: true,
  name: 'filterDescription'
})
export class filterDescriptionPipe implements PipeTransform {
  transform(descriptions: Item[], searchText: string) {
    searchText = searchText.toLowerCase();
    return descriptions.filter(item => {
      return item.description.toLowerCase().includes(searchText);
    });
  }
}
