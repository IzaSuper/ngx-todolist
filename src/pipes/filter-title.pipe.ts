import {Pipe, PipeTransform} from "@angular/core";
import {Item} from "../app/interface/item";

@Pipe({
  standalone: true,
  name: 'filterTitle'
})
export class filterTitlePipe implements PipeTransform {
  transform(titles: Item[], searchText: string) {
    searchText = searchText.toLowerCase();
    return titles.filter(item => {
      return item.title.toLowerCase().includes(searchText);
    });
  }
}
